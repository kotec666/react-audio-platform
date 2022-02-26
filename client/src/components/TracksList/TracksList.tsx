import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ALBUM_ROUTE, FAVORITE_ROUTE, GENRE_ROUTE, RECENTLY_ROUTE } from '../../utils/consts'
import s from './TracksList.module.scss'
import Pagination from '../Pagination/Pagination'
import { useAppSelector } from '../../hooks/redux'
import TrackListComponent from './TrackListComponent'
import { useDebounce } from '../../hooks/useDebounce'
import { trackAPI } from '../../servicesAPI/TrackService'


const TracksList = () => {
  const location = useLocation()

  const { user } = useAppSelector(state => state.userReducer)
  const [currentPath, setCurrentPath] = useState('')
  const [genreCode, setGenreCode] = useState('')
  const [activeAlbumId, setActiveAlbumId] = useState(0)

  const pageSize = 14
  const [page, setPage] = useState(1)

  const [searchValue, setSearchValue] = useState('')
  const search = useDebounce(searchValue, 500)

  useEffect(() => {
    const currentPath = location.pathname.split('/')
    console.log('curPath: ' + currentPath[1])
    setCurrentPath(currentPath[1])
    if (currentPath[1] === FAVORITE_ROUTE.slice(1)) {
      console.log('favorite')
    }
    if (currentPath[1] === RECENTLY_ROUTE.slice(1)) {
      console.log('recently')
    }
    if (currentPath[1] === GENRE_ROUTE.slice(1)) {
      setGenreCode(currentPath[2])
    }
    if (currentPath[1] === ALBUM_ROUTE.slice(1)) {
      console.log('albums ' + currentPath[2])
      setActiveAlbumId(+currentPath[2])
    }
  }, [location])

  const [addFavorite] = trackAPI.useAddFavoriteMutation()
  const [deleteFavorite] = trackAPI.useDeleteFavoriteMutation()

  const { data: favorite } = trackAPI.useGetFavoriteQuery({
    page: page,
    limit: pageSize,
    search: search,
    userId: user ? user.id : 0
  })

  const { favoriteTrack } = useAppSelector(state => state.favoriteReducer)

  const { data: recently } = trackAPI.useGetRecentlyQuery({
    page: page,
    limit: pageSize,
    search: search,
    userId: user ? user.id : 0
  })

  const { data: codeGenreTracks } = trackAPI.useGetTracksByCodeQuery({
    page: page,
    limit: pageSize,
    code: genreCode,
    search: search
  })

  const { data: albumTracks } = trackAPI.useGetTracksByAlbumIdQuery({
    albumId: activeAlbumId,
    limit: pageSize,
    page: page,
    search: search
  })

  const { favoriteId } = useAppSelector(state => state.favoriteReducer)

  const addToFavoriteHandler = async (id: number) => {
    await addFavorite({ trackId: id, favoriteId: favoriteId.id }).unwrap()
  }

  const deleteFromFavoriteHandler = async (id: number) => {
    await deleteFavorite({ trackId: id, favoriteId: favoriteId.id }).unwrap()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..." value={searchValue} onChange={(e) => handleSearch(e)}  />
        </div>
        <div className={s.actionsWrapper}>
          <span>
            {
              currentPath === `${FAVORITE_ROUTE.slice(1)}`
                ? `Любимые треки:`
                : currentPath === `${RECENTLY_ROUTE.slice(1)}`
                   ? `Недавно прослушанные:`
                   : currentPath === `${ALBUM_ROUTE.slice(1)}`
                     ? `Альбом:`
                     : currentPath === `${GENRE_ROUTE.slice(1)}`
                       ? `${codeGenreTracks?.genre?.rows[0]?.name}:`
                       : null
            }
          </span>
          <select>
            <option value="">По дате</option>
            <option value="">По прослушиваниям</option>
            <option value="">В обратном порядке</option>
          </select>
        </div>
      </div>
      <div className={s.contentWrapper}>
        <div className={s.trackListWrapper}>
          {
            currentPath === `${FAVORITE_ROUTE.slice(1)}`
              ? favorite && favorite?.favorite?.rows.map((item) => {
              return (
                item && item?.userTracksFavorite.map((row, index) => {
                    return (
                      <TrackListComponent
                        key={row.id}
                        subData={favoriteTrack.favoriteTrack}
                        deleteFromFavoriteHandler={deleteFromFavoriteHandler}
                        addToFavoriteHandler={addToFavoriteHandler}
                        row={row}
                        index={index}
                        data={item?.userTracksFavorite}
                      />
                    )
                  }
                )
              )
            })
              : currentPath === `${RECENTLY_ROUTE.slice(1)}`
              ? recently && recently?.recently?.rows.map((item) => {
                return (
                  item && item?.userTracksRecently.map((row, index) => {
                      return (
                        <TrackListComponent
                          key={row.id}
                          subData={favoriteTrack.favoriteTrack}
                          deleteFromFavoriteHandler={deleteFromFavoriteHandler}
                          addToFavoriteHandler={addToFavoriteHandler}
                          row={row}
                          index={index}
                          data={item?.userTracksRecently}
                        />
                      )
                    }
                  )
                )
              })
              : currentPath === `${ALBUM_ROUTE.slice(1)}`
                ? albumTracks && albumTracks?.album?.rows.map((item) => {
                  return (
                    item && item?.albumTracks.map((row, index) => {
                        return (
                          <TrackListComponent
                            key={row.id}
                            subData={favoriteTrack.favoriteTrack}
                            deleteFromFavoriteHandler={deleteFromFavoriteHandler}
                            addToFavoriteHandler={addToFavoriteHandler}
                            row={row}
                            index={index}
                            data={item?.albumTracks}
                          />
                        )
                      }
                    )
                  )
                })
                : currentPath === `${GENRE_ROUTE.slice(1)}`
                  ? codeGenreTracks && codeGenreTracks?.genre?.rows.map((item) => {
                  return (
                    item && item?.genreTracks.map((row, index) => {
                        return (
                          <TrackListComponent
                            key={row.id}
                            subData={favoriteTrack.favoriteTrack}
                            deleteFromFavoriteHandler={deleteFromFavoriteHandler}
                            addToFavoriteHandler={addToFavoriteHandler}
                            row={row}
                            index={index}
                            data={item?.genreTracks}
                          />
                        )
                      }
                    )
                  )
                })
                 : null
          }
        </div>

        <div className={s.paginationWrapper}>
          {/*<Pagination pages={[1,2,3,4,5]} />*/}
        </div>
      </div>
    </div>
  )
}

export default TracksList
