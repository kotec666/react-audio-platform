import { createSlice } from '@reduxjs/toolkit'
import { IFavoriteTrack } from '../../models/IFavoriteTrack'
import { favoriteTrackAPI } from '../../servicesAPI/FavoriteTrackService'


interface FavoriteTrackState {
  favoriteTrack: IFavoriteTrack
  isLoading: boolean
  error: string
}

const initialState: FavoriteTrackState = {
  favoriteTrack: { favoriteTrack: [{ id: 0, createdAt: '', updatedAt: '', favoriteId: 0, trackId: 0 }] },
  isLoading: false,
  error: ''
}


export const favoriteTrackSlice = createSlice({
  name: 'favoriteTrack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      favoriteTrackAPI.endpoints.getFavoriteTrack.matchFulfilled,
      (state, { payload }) => {
        state.favoriteTrack = payload
      }
    )
  }
})

export default favoriteTrackSlice.reducer
