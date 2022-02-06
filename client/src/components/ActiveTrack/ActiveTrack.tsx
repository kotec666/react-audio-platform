import React from 'react'
import s from './ActiveTrack.module.scss'
import trackIcon from './../../utils/icons/trackIcon.png'
import heart from './../../utils/icons/heart.png'
import volume from './../../utils/icons/volume.png'
import prevIcon from './../../utils/icons/prevIcon.png'
import bigPause from './../../utils/icons/bigPause.png'
import nextIcon from './../../utils/icons/nextIcon.png'

const ActiveTrack = () => {
  return (
    <div className={s.activeTrackWrapper}>
        <div className={s.trackNameWrapper}>
            <div className={s.trackPictureWrapper}>
              <img src={trackIcon} alt="trackIcon"/>
            </div>
            <div className={s.trackNamesWrapper}>
              <div className={s.trackMainNameWrapper}>
                  Доппельгенгер
              </div>
              <div className={s.trackGroupNameWrapper}>
                  Црвених цветова
              </div>
            </div>
            <div className={s.trackFavoriteWrapper}>
              <img src={heart} alt="heart"/>
            </div>
        </div>
        <div className={s.trackControlsWrapper}>
            <div className={s.trackControls}>
              <div className={s.controlIcon}>
                <img src={prevIcon} alt="controlIcon"/>
              </div>
              <div className={s.controlIcon}>
                <img src={bigPause} alt="controlIcon"/>
              </div>
              <div className={s.controlIcon}>
                <img src={nextIcon} alt="controlIcon"/>
              </div>
            </div>
            <div className={s.trackTimingLineWrapper}>
              <span>1:22</span>
              <input type="range"/>
              <span>3:44</span>
            </div>
        </div>
        <div className={s.trackVolumeWrapper}>
            <div className={s.volumeWrapper}>
              <img src={volume} alt="volume"/>
            </div>
            <div className={s.volumeInputWrapper}>
              <input type="range"/>
            </div>
        </div>
    </div>
  )
}

export default ActiveTrack
