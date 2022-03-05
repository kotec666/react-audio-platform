import React, { useEffect, useState } from 'react'
import s from './HomePage.module.scss'
import Album from '../../components/Album/Album'
import Singer from '../../components/Singer/Singer'
import TrackComponent from '../../components/TrackComponent/TrackComponent'
import { useDebounce } from '../../hooks/useDebounce'
import { singerAPI } from '../../servicesAPI/SingerService'
import { trackAPI } from '../../servicesAPI/TrackService'
import { useAppDispatch } from '../../hooks/redux'
import { setActiveTracks } from '../../store/reducers/PlayerReducer'
import Loader from '../../components/Loader/Loader'

const HomePage = () => {
  const dispatch = useAppDispatch()

  const pageSize = 8
  const page = 1
  const [searchValue, setSearchValue] = useState('')
  const search = useDebounce(searchValue, 500)
  const { data: album, isLoading: isLoadingAlbum, isError: isErrorAlbum } = trackAPI.useGetAlbumQuery({limit: pageSize, page, search})
  const { data: singer, isLoading: isLoadingSinger, isError: isErrorSinger } = singerAPI.useGetSingerQuery({ limit: pageSize, page, search })
  const { data: track, isLoading: isLoadingTrack, isError: isErrorTrack } = trackAPI.useGetTrackQuery({ limit: pageSize, page, search })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    dispatch(setActiveTracks(track?.track?.rows))
  }, [track])

  return (
    <div className={s.pageWrapper}>
      <div style={{marginTop: '6.825rem'}} className={s.contentWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..." value={searchValue} onChange={(e) => handleSearch(e)} />
        </div>

        <div className={s.searchResults}>
          <div className={s.helpText}>
            {album && album.album.count !== 0 ? <span>Альбомы:</span> : null }
          </div>

          <div className={s.resultsWrapper}>
            {
              isLoadingAlbum && isLoadingAlbum ? Array(6)
                  .fill(0)
                  .map((_, index) => <Loader key={`${_}${index}`} />)
                :
                album && album.album.rows.map((album) => {
                  return (
                    <Album key={album.id} id={album.id} name={album.name} />
                  )
                })
            }
            { isErrorAlbum && <h1>Произошла ошибка при загрузке</h1> }
          </div>

          <div className={s.helpText}>
            {track && track.track && track.track.count !== 0 ? <span>Треки:</span> : null }
          </div>

          <div className={s.resultsWrapper}>
            {
              isLoadingTrack && isLoadingTrack ? Array(6)
                  .fill(0)
                  .map((_, index) => <Loader key={`${_}${index}`} />)
                :
                track && track?.track?.rows.map((track, index) => {
                  return (
                    <TrackComponent
                      key={track.id}
                      id={track.id}
                      name={track.name}
                      index={index}
                      albumId={track.albumId}
                      genreId={track.genreId}
                      streams={track.streams}
                      trackAudio={track.trackAudio}
                      userId={track.userId}
                    />
                  )
                })
            }
            { isErrorTrack && <h1>Произошла ошибка при загрузке</h1> }
          </div>

          <div className={s.helpText}>
            {singer && singer.singer.count !== 0 ? <span>Исполнители:</span> : null }
          </div>

          <div className={s.resultsWrapper}>
            {
              isLoadingSinger && isLoadingSinger ? Array(6)
                  .fill(0)
                  .map((_, index) => <Loader key={`${_}${index}`} />)
                :
                singer && singer.singer.rows.map((singer) => {
                  return (
                    <Singer key={singer.id} id={singer.id} pseudonym={singer.pseudonym} />
                  )
                })
            }
            {isErrorSinger && <h1>Произошла ошибка при загрузке</h1>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage
