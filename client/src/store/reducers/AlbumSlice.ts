import { createSlice } from '@reduxjs/toolkit'
import {IAlbum} from '../../models/IAlbum'
import { trackAPI } from '../../servicesAPI/TrackService'


interface AlbumState {
  album: IAlbum
  isLoading: boolean
  error: string
  albumTracks: IAlbum
}

const initialState: AlbumState = {
  album: {album: {count: 0, rows: []}},
  isLoading: false,
  error: '',
  albumTracks: {album: {count: 0, rows: []}}
}


export const albumSlice = createSlice({
  name:'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      trackAPI.endpoints.getAlbum.matchFulfilled,
      (state, { payload }) => {
        state.album = payload !== null ? payload : {album: {count: 0, rows: []}}
      }
    )
    builder.addMatcher(
      trackAPI.endpoints.getTracksByAlbumId.matchFulfilled,
      (state, { payload }) => {
        state.albumTracks = payload !== null ? payload : {album: {count: 0, rows: []}}
      }
    )
  },
})

export default albumSlice.reducer
