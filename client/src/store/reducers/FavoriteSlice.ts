import { createSlice } from '@reduxjs/toolkit'
import { IFavorite, IFavoriteData, IFavoriteId } from '../../models/IFavorite'
import { IFavoriteTrack } from '../../models/IFavoriteTrack'
import { trackAPI } from '../../servicesAPI/TrackService'


interface FavoriteState {
  favorite: IFavorite
  isLoading: boolean
  error: string
  rows: IFavoriteData[]
  favoriteId: IFavoriteId
  favoriteTrack: IFavoriteTrack
}

const initialState: FavoriteState = {
  favorite: { favorite: { count: 0, rows: [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksFavorite:[]}] } },
  rows: [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksFavorite:[]}],
  favoriteId: {id: 0, userId: 0, createdAt: '', updatedAt: ''},
  favoriteTrack: { favoriteTrack: [{ id: 0, createdAt: '', updatedAt: '', favoriteId: 0, trackId: 0 }] },
  isLoading: false,
  error: '',
}


export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      trackAPI.endpoints.getFavorite.matchFulfilled,
      (state, { payload }) => {
        state.favorite.favorite = payload !== null ? payload.favorite : {count: 0, rows: []}
        state.rows = payload !== null ? payload.favorite.rows : [{id: 0, createdAt: '', updatedAt: '', userId: 0, userTracksFavorite:[]}]
      }
    )
    builder.addMatcher(
      trackAPI.endpoints.getFavoriteId.matchFulfilled,
      (state, { payload }) => {
        state.favoriteId = payload !== null ? payload : {id: 0, userId: 0, createdAt: '', updatedAt: ''}
      }
    )
    builder.addMatcher(
      trackAPI.endpoints.getFavoriteTrack.matchFulfilled,
      (state, { payload }) => {
        state.favoriteTrack = payload !== null ? payload : { favoriteTrack: [{ id: 0, createdAt: '', updatedAt: '', favoriteId: 0, trackId: 0 }] }
      }
    )
  }
})

export default favoriteSlice.reducer
