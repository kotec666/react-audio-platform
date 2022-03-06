import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ALBUM_ROUTE, FAVORITE_ROUTE, GENRE_ROUTE, RECENTLY_ROUTE } from '../../utils/consts'
import s from './TracksList.module.scss'
import Pagination from '../Pagination/Pagination'
import { useAppSelector } from '../../hooks/redux'
import TrackListComponent from './TrackListComponent'
import { useDebounce } from '../../hooks/useDebounce'
import { trackAPI } from '../../servicesAPI/TrackService'
import { calculatePagesCount } from '../../hooks/usePagination'
import RecentlyAndFavoriteLoader from '../RecentlyAndFavoriteLoader/RecentlyAndFavoriteLoader'


const TracksList = () => {
  const location = useLocation()

  const { user } = useAppSelector(state => state.userReducer)
  const [currentPath, setCurrentPath] = useState('')
  const [genreCode, setGenreCode] = useState('')
  const [activeAlbumId, setActiveAlbumId] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [albumTracksCount, setAlbumTracksCount] = useState(0)
  const [genreTracksCount, setGenreTracksCount] = useState(0)
  const [recentlyTracksCount, setRecentlyTracksCount] = useState(0)
  const [favoriteTracksCount, setFavoriteTracksCount] = useState(0)

  const pageSize = 14
  const [page, setPage] = useState(1)

  const [searchValue, setSearchValue] = useState('')
  const search = useDebounce(searchValue, 500)

  const { data: favorite, isLoading: isLoadingFavorite } = trackAPI.useGetFavoriteQuery({
    page: page,
    limit: pageSize,
    search: search,
    userId: user ? user.id : 0
  })

  const { favoriteTrack } = useAppSelector(state => state.favoriteReducer)

  const { data: recently, isLoading: isLoadingRecently, } = trackAPI.useGetRecentlyQuery({
    page: page,
    limit: pageSize,
    search: search,
    userId: user ? user.id : 0
  })

  const { data: codeGenreTracks, isLoading: isLoadingCodeGenreTracks } = trackAPI.useGetTracksByCodeQuery({
    page: page,
    limit: pageSize,
    code: genreCode,
    search: search
  })

  const { data: albumTracks, isLoading: isLoadingAlbumTracks } = trackAPI.useGetTracksByAlbumIdQuery({
    albumId: activeAlbumId,
    limit: pageSize,
    page: page,
    search: search
  })

  useEffect(() => {
      albumTracks ? setAlbumTracksCount(albumTracks?.album?.count) : null
  }, [albumTracks])

  useEffect(() => {
      favorite ? setFavoriteTracksCount(favorite?.favorite?.count) : null
  }, [favorite])

  useEffect(() => {
      recently ? setRecentlyTracksCount(recently?.recently?.count) : null
  }, [recently])

  useEffect(() => {
      codeGenreTracks ? setGenreTracksCount(codeGenreTracks?.genre?.count) : null
  }, [codeGenreTracks])

  useEffect(() => {
    const currentPath = location.pathname.split('/')
    console.log('curPath: ' + currentPath[1])
    setCurrentPath(currentPath[1])

    if (currentPath[1] === FAVORITE_ROUTE.slice(1)) {
      console.log('favorite')
      setPagesCount(calculatePagesCount(pageSize, favoriteTracksCount))
    }
    if (currentPath[1] === RECENTLY_ROUTE.slice(1)) {
      console.log('recently')
      setPagesCount(calculatePagesCount(pageSize, recentlyTracksCount))
    }
    if (currentPath[1] === GENRE_ROUTE.slice(1)) {
      setGenreCode(currentPath[2])
      setPagesCount(calculatePagesCount(pageSize, genreTracksCount))
    }
    if (currentPath[1] === ALBUM_ROUTE.slice(1)) {
      console.log('albums ' + currentPath[2])
      setActiveAlbumId(+currentPath[2])
      setPagesCount(calculatePagesCount(pageSize, albumTracksCount))
    }
  }, [location])

  const [addFavorite] = trackAPI.useAddFavoriteMutation()
  const [deleteFavorite] = trackAPI.useDeleteFavoriteMutation()

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
          {/*{<select>*/}
          {/*  <option value="">По дате</option>*/}
          {/*  <option value="">По прослушиваниям</option>*/}
          {/*  <option value="">В обратном порядке</option>*/}
          {/*</select>}*/}
        </div>
      </div>
      <div className={s.contentWrapper}>
        <div className={s.trackListWrapper}>
          {
            currentPath === `${FAVORITE_ROUTE.slice(1)}`
              ? isLoadingFavorite && isLoadingFavorite ? Array(6)
                .fill(0)
                .map((_, index) => <RecentlyAndFavoriteLoader key={`${_}${index}`} />)
              : favorite && favorite?.favorite?.rows.map((item) => {
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
              ? isLoadingRecently && isLoadingRecently ? Array(6)
                .fill(0)
                .map((_, index) => <RecentlyAndFavoriteLoader key={`${_}${index}`} />)
               : recently && recently?.recently?.rows.map((item) => {
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
                ? isLoadingAlbumTracks && isLoadingAlbumTracks ? Array(6)
                    .fill(0)
                    .map((_, index) => <RecentlyAndFavoriteLoader key={`${_}${index}`} />)
                  : albumTracks && albumTracks?.album?.rows.map((item) => {
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
                ? isLoadingCodeGenreTracks && isLoadingCodeGenreTracks ? Array(6)
                   .fill(0)
                   .map((_, index) => <RecentlyAndFavoriteLoader key={`${_}${index}`} />)
                 : codeGenreTracks && codeGenreTracks?.genre?.rows.map((item) => {
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
          <Pagination page={page} pagesCount={pagesCount} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}

export default TracksList
