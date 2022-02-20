import { createSlice } from '@reduxjs/toolkit'
import { ITrack } from '../../models/ITrack'
import { trackAPI } from '../../servicesAPI/TrackService'


interface TrackState {
  track: ITrack
  isLoading: boolean
  error: string
}

const initialState: TrackState = {
  track: { track: { count: 0, rows: [] } },
  isLoading: false,
  error: ''
}


export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      trackAPI.endpoints.getTrack.matchFulfilled,
      (state, { payload }) => {
        state.track.track = payload.track
      }
    )
  }
})

export default trackSlice.reducer
