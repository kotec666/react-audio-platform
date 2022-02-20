import {createSlice} from '@reduxjs/toolkit'
import { ITrackData } from '../../models/ITrack'

interface PlayerState {
  active: null | ITrackData
  volume: number
  duration: number
  currentTime: number
  pause: boolean
  trackIndex: number
}

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  pause: true,
  trackIndex: 0,
}


const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    playTrack(state) {
      state.pause = false
    },
    pauseTrack(state) {
      state.pause = true
    },
    setDuration(state, action) {
      state.duration = action.payload
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload
    },
    setActiveTrack(state, action) {
      state.active = action.payload
    },
    setCurrIndex(state, action) {
      state.trackIndex = action.payload
    },
  }
})

export default trackSlice.reducer
export const {playTrack, pauseTrack, setDuration, setVolume, setCurrentTime, setActiveTrack, setCurrIndex} = trackSlice.actions
