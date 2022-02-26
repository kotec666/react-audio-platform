import { createSlice } from '@reduxjs/toolkit'
import { IRecently, IRecentlyData, IRecentlyId } from '../../models/IRecently'
import { trackAPI } from '../../servicesAPI/TrackService'


interface RecentlyState {
  recently: IRecently
  isLoading: boolean
  error: string
  rows: IRecentlyData[]
  recentlyId: IRecentlyId
}

const initialState: RecentlyState = {
  recently: { recently: { count: 0, rows: [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksRecently:[]}] } },
  rows: [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksRecently:[]}],
  recentlyId: {id: 0, userId: 0, createdAt: '', updatedAt: ''},
  isLoading: false,
  error: '',
}


export const recentlySlice = createSlice({
  name: 'recently',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      trackAPI.endpoints.getRecently.matchFulfilled,
      (state, { payload }) => {
        state.recently.recently = payload !== null ? payload.recently : {count: 0, rows: []}
        state.rows = payload !== null ? payload.recently.rows : [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksRecently:[]}]
      }
    )
    builder.addMatcher(
      trackAPI.endpoints.getRecentlyId.matchFulfilled,
      (state, { payload }) => {
        state.recentlyId = payload !== null ? payload : {id: 0, userId: 0, createdAt: '', updatedAt: ''}
      }
    )
  }
})

export default recentlySlice.reducer
