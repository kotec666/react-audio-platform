import { createSlice } from '@reduxjs/toolkit'
import { IFavorite, IFavoriteData, IFavoriteId } from '../../models/IFavorite'
import { favoriteAPI } from '../../servicesAPI/FavoriteService'


interface FavoriteState {
  favorite: IFavorite
  isLoading: boolean
  error: string
  rows: IFavoriteData[]
  favoriteId: IFavoriteId
}

const initialState: FavoriteState = {
  favorite: { favorite: { count: 0, rows: [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksFavorite:[]}] } },
  rows: [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksFavorite:[]}],
  favoriteId: {id: 0, userId: 0, createdAt: '', updatedAt: ''},
  isLoading: false,
  error: ''
}


export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      favoriteAPI.endpoints.getFavorite.matchFulfilled,
      (state, { payload }) => {
        state.favorite.favorite = payload !== null ? payload.favorite : {count: 0, rows: []}
        state.rows = payload !== null ? payload.favorite.rows : [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksFavorite:[]}]
      }
    )
    builder.addMatcher(
      favoriteAPI.endpoints.getFavoriteId.matchFulfilled,
      (state, { payload }) => {
        state.favoriteId = payload !== null ? payload : {id: 0, userId: 0, createdAt: '', updatedAt: ''}
      }
    )
  }
})

export default favoriteSlice.reducer
