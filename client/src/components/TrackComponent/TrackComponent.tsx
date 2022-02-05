import React from 'react'
import s from '../../pages/HomePage/HomePage.module.scss'
import trackIcon from '../../utils/icons/trackIcon.png'

interface TrackProps {
  id: number
  name: string
}


const TrackComponent:React.FC<TrackProps> = ({id, name}) => {
  return (
    <div className={s.trackResult}>
      <div className={s.trackWrapper}>
        <div className={s.imgWrapper}>
          <img src={trackIcon} alt="album" />
        </div>
      </div>
      <span>{name} {id}</span>
    </div>
  )
}

export default TrackComponent
