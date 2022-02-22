import React from 'react'
import s from '../../pages/HomePage/HomePage.module.scss'
import trackIcon from '../../utils/icons/trackIcon.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  pauseTrack,
  setCurrIndex,
  setActiveTrack
} from '../../store/reducers/PlayerReducer'

interface TrackProps {
  id: number
  name: string
  index: number
  userId: number
  streams: number
  trackAudio: string
  genreId: number
  albumId: number | null
}


const TrackComponent:React.FC<TrackProps> = ({id, name, index, albumId, genreId, userId, streams, trackAudio}) => {
  const dispatch = useAppDispatch()
  const Track = {id, name, userId, streams, trackAudio, genreId, albumId}

  const play = () => {
    dispatch(setActiveTrack(Track))
    dispatch(pauseTrack())
    dispatch(setCurrIndex(index))
  }
  return (
    <div className={s.trackResult} onClick={play}>
      <div className={s.trackWrapper}>
        <div className={s.imgWrapper}>
          <img src={trackIcon} alt="track" />
        </div>
      </div>
      <span>{name} id:{id}</span>
    </div>
  )
}

export default TrackComponent
