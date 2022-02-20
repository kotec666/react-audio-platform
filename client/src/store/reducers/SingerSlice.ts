import { createSlice } from '@reduxjs/toolkit'
import { ISinger } from '../../models/ISinger'
import { singerAPI } from '../../servicesAPI/SingerService'


interface SingerState {
  singer: ISinger
  isLoading: boolean
  error: string
}

const initialState: SingerState = {
  singer: { singer: { count: 0, rows: [] } },
  isLoading: false,
  error: ''
}


export const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      singerAPI.endpoints.getSinger.matchFulfilled,
      (state, { payload }) => {
        state.singer.singer = payload.singer
      }
    )
  }
})

export default singerSlice.reducer
