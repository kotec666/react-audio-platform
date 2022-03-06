import React, { useEffect } from 'react'
import s from './TracksList.module.scss'
import trackListPlay from '../../utils/icons/trackListPlay.png'
import trackListPause from '../../utils/icons/trackListPause.png'
import { isItemAdded } from '../../hooks/useIsAddedCheck'
import favoriteHeart from '../../utils/icons/favoriteHeart.png'
import heart from '../../utils/icons/heart.png'
import deleteIcon from '../../utils/icons/deleteIcon.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IUserFavoriteTracks } from '../../models/IFavorite'
import { IUserRecentlyTracks } from '../../models/IRecently'
import { IAlbumTracks } from '../../models/IAlbum'
import { favoriteTrackRows } from '../../models/IFavoriteTrack'
import { trackAPI } from '../../servicesAPI/TrackService'
import { setActiveTrack, setActiveTracks, setCurrIndex } from '../../store/reducers/PlayerReducer'
import { ITrackData } from '../../models/ITrack'
import { singerAPI } from '../../servicesAPI/SingerService'

interface TrackListComponentProps {
  row: IUserFavoriteTracks | IUserRecentlyTracks | IAlbumTracks
  deleteFromFavoriteHandler: (id: number) => Promise<void>
  addToFavoriteHandler: (id: number) => Promise<void>
  subData: favoriteTrackRows[]
  index: number
  data?: ITrackData[]
}

const TrackListComponent: React.FC<TrackListComponentProps> = ({
      row,
      deleteFromFavoriteHandler,
      addToFavoriteHandler,
      subData,
      index,
      data
}) => {
  const dispatch = useAppDispatch()

  const { active, pause } = useAppSelector(state => state.playerReducer)
  const { recentlyId } = useAppSelector(state => state.recentlyReducer)
  const { user } = useAppSelector(state => state.userReducer)
  const {data: singerInfo} = singerAPI.useGetSingerDataByIdQuery({userId: row.userId })

  const [deleteTrack] = trackAPI.useDeleteTrackMutation()
  const [addRecently] = trackAPI.useAddRecentlyMutation()

  const deleteTrackFromWebsiteHandler = async (id: number) => {
      await deleteTrack({trackId: id}).unwrap()
  }

  const play = async (id: number) => {
    const Track = {id: row.id, name: row.name, userId: row.userId, streams: row.streams, trackAudio: row.trackAudio, genreId: row.genreId, albumId: row.albumId}
    dispatch(setActiveTrack(Track))
    dispatch(setCurrIndex(index))
    await addRecently({ trackId: id, recentlyId: recentlyId.id }).unwrap()
  }

  useEffect(() => {
    dispatch(setActiveTracks(data))
  }, [data])

  return (
    <div className={s.trackWrapper}>
      <div className={s.trackPlayIconWrapper} onClick={() => play(row.id)}>
        {
         active && active.id === row.id && !pause
            ? <img src={trackListPause} alt="pauseIcon"/>
            : <img src={trackListPlay} alt="playIcon"/>
        }
      </div>
      <div className={s.trackNameWrapper}>
        {row.name} - {singerInfo && singerInfo?.singer[0]?.pseudonym}
      </div>
      <div className={s.trackFavoriteIconWrapper}>
        {
          user && user.id !== 0
            ? isItemAdded(subData, row.id)
            ? <div className={s.iconWrapper} onClick={() => deleteFromFavoriteHandler(row.id)}>
              <img src={favoriteHeart} alt="heart"/>
            </div>
            : <div className={s.iconWrapper} onClick={() => addToFavoriteHandler(row.id)}>
              <img src={heart} alt="favorite"/>
            </div>
            : null
        }
      </div>
      {
        user && user.role === 'ADMIN' || user.id === row.userId ?
          <div className={s.trackDeleteIconWrapper} onClick={() => deleteTrackFromWebsiteHandler(row.id)} >
            <div className={s.iconWrapper}>
              <img src={deleteIcon} alt="favorite"/>
            </div>
          </div>
          : null
      }
    </div>
  )
}

export default TrackListComponent
