import { createSlice } from '@reduxjs/toolkit'
import { IAllGenre, IGenre } from '../../models/IGenre'
import { trackAPI } from '../../servicesAPI/TrackService'


interface GenreState {
  genre: IGenre
  isLoading: boolean
  error: string
  allGenre: IAllGenre[]
  codeGenreTracks: IGenre
}

const initialState: GenreState = {
  genre: { genre: { count: 0, rows: [] } },
  isLoading: false,
  error: '',
  allGenre: [{id: 0,name: '', code: '',createdAt: '', updatedAt: ''}],
  codeGenreTracks: { genre: { count: 0, rows: [] } }
}


export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      trackAPI.endpoints.getGenre.matchFulfilled,
      (state, { payload }) => {
        state.genre.genre = payload.genre
      }
    )
    builder.addMatcher(
      trackAPI.endpoints.getAllGenre.matchFulfilled,
      (state, { payload }) => {
        state.allGenre = payload !== null ? payload : [{id: 0,name: '', code: '',createdAt: '', updatedAt: ''}]
      }
    )
    builder.addMatcher(
      trackAPI.endpoints.getTracksByCode.matchFulfilled,
      (state, { payload }) => {
        state.codeGenreTracks = payload !== null ? payload : { genre: { count: 0, rows: [] } }
      }
    )
  }
})

export default genreSlice.reducer
