import React, { useEffect } from 'react'
import s from './ActiveTrack.module.scss'
import trackIcon from './../../utils/icons/trackIcon.png'
import heart from './../../utils/icons/heart.png'
import prevIcon from './../../utils/icons/prevIcon.png'
import bigPause from './../../utils/icons/bigPause.png'
import bigPlay from './../../utils/icons/bigPlay.png'
import nextIcon from './../../utils/icons/nextIcon.png'
import volumeIcon from './../../utils/icons/volume.png'
import middleVolume from './../../utils/icons/middleVolume.png'
import lowVolume from './../../utils/icons/lowVolume.png'
import highVolume from './../../utils/icons/highVolume.png'
import muteVolume from './../../utils/icons/muteVolume.png'
import {
  pauseTrack,
  playTrack,
  setActiveTrack,
  setCurrentTime,
  setCurrIndex,
  setDuration,
  setVolume
} from '../../store/reducers/PlayerReducer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

let audio: HTMLAudioElement

const ActiveTrack = () => {
  const { active, pause, duration, currentTime, volume, trackIndex } = useAppSelector(state => state.playerReducer)
  const { track: tracks } = useAppSelector(state => state.trackReducer)
  const { user } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()


  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      dispatch(setCurrIndex(trackIndex))
      dispatch(setActiveTrack(active))
    } else {
      const prevTrack = tracks.track.rows.filter((track, i) => i === trackIndex - 1)
      dispatch(setActiveTrack(prevTrack[0]))
      dispatch(setCurrIndex(trackIndex - 1))
    }
  }

  const toNextTrack = () => {
    if (trackIndex < tracks.track.rows.length - 1) {
      const nextTrack = tracks.track.rows.filter((track, i) => i === trackIndex + 1)
      dispatch(setCurrIndex(trackIndex + 1))
      dispatch(setActiveTrack(nextTrack[0]))
    } else {
      dispatch(setCurrIndex(trackIndex))
      dispatch(setActiveTrack(active))
    }
  }

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    } else {
      setAudio()
      play()
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.trackAudio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)))
      }
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
      }
    }
  }

  const play = () => {
    if (pause) {
      dispatch(playTrack())
      audio.play()
    } else {
      dispatch(pauseTrack())
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    dispatch(setVolume(Number(e.target.value)))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    dispatch(setCurrentTime(Number(e.target.value)))
  }

  const muteTrack = () => {
    if (volume === 0) {
      audio.volume = 25 / 100
      dispatch(setVolume(25))
    } else {
      audio.volume = 0
      dispatch(setVolume(0))
    }
  }

  if (!active) {
    return null
  }

  function secondsToHms(duration: number) {
    duration = Number(duration)

    const h = Math.floor(duration / 3600)
    const m = Math.floor(duration % 3600 / 60)
    const s = Math.floor(duration % 3600 % 60)

    return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2)
  }

  const addToFavorite = () => {
    console.log(active.id, user.id) // + isAdded
  }

  return (
    <div className={s.activeTrackWrapper}>
      <div className={s.trackNameWrapper}>
        <div className={s.trackPictureWrapper}>
          <img src={trackIcon} alt="trackIcon"/>
        </div>
        <div className={s.trackNamesWrapper}>
          <div className={s.trackMainNameWrapper}>
            {active && active.name}
          </div>
          <div className={s.trackGroupNameWrapper}>
            {active && active.userId} userId
          </div>
        </div>
        {
          user && user.id !== 0
           ?  <div className={s.trackFavoriteWrapper} onClick={addToFavorite}>
                <img src={heart} alt="heart"/>
              </div>
           :   null}
      </div>
      <div className={s.trackControlsWrapper}>
        <div className={s.trackControls}>
          <div className={s.controlIcon} onClick={toPrevTrack}>
            <img src={prevIcon} alt="controlIcon"/>
          </div>
          <div onClick={play} className={s.controlIcon}>
            {
              pause
                ? <img src={bigPlay} alt="controlIcon"/>
                : <img src={bigPause} alt="controlIcon"/>
            }
          </div>
          <div onClick={toNextTrack} className={s.controlIcon}>
            <img src={nextIcon} alt="controlIcon"/>
          </div>
        </div>
        <div className={s.trackTimingLineWrapper}>
          <span>{secondsToHms(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={changeCurrentTime}
          />
          <span>{secondsToHms(duration)}</span>
        </div>
      </div>
      <div className={s.trackVolumeWrapper}>
        <div
          className={s.volumeWrapper}
          onClick={muteTrack}
        >
          <img src={
            volume === 0
              ? muteVolume
              : volume !== 0
              && volume < 25
              ? lowVolume
              : middleVolume
              && volume > 60
                ? highVolume
                : volumeIcon
          }
               alt="volume"
          />
        </div>
        <div className={s.volumeInputWrapper}>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  )
}

export default ActiveTrack
