import { createSlice } from '@reduxjs/toolkit'
import { ISinger, ISingerDetailed } from '../../models/ISinger'
import { singerAPI } from '../../servicesAPI/SingerService'

interface SingerState {
  singer: ISinger
  isLoading: boolean
  error: string
  singerInfo: ISingerDetailed
}

const initialState: SingerState = {
  singer: { singer: { count: 0, rows: [] } },
  isLoading: false,
  error: '',
  singerInfo: {singer: [{id: 0, email: '', login: '', pseudonym: '', role: '', userAlbums: [], userTracks: []}]},
}


export const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    clearSinger(state) {
      state.singerInfo = {singer: [{id: 0, email: '', login: '', pseudonym: '', role: '', userAlbums: [], userTracks: []}]}
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      singerAPI.endpoints.getSinger.matchFulfilled,
      (state, { payload }) => {
        state.singer.singer = payload.singer
      }
    )
    builder.addMatcher(
       singerAPI.endpoints.getSingerDataById.matchFulfilled,
       (state, { payload }) => {
         state.singerInfo = payload !== null ? payload : {singer: [{id: 0, email: '', login: '', pseudonym: '', role: '', userAlbums: [], userTracks: []}]}
       }
     )
  }
})

export const {clearSinger} = singerSlice.actions
export default singerSlice.reducer
