import { createSlice } from '@reduxjs/toolkit'
import { IAllGenre, IGenre } from '../../models/IGenre'
import { genreAPI } from '../../servicesAPI/GenreService'


interface GenreState {
  genre: IGenre
  isLoading: boolean
  error: string
  allGenre: IAllGenre[]
}

const initialState: GenreState = {
  genre: { genre: { count: 0, rows: [] } },
  isLoading: false,
  error: '',
  allGenre: [{id: 0,name: '', code: '',createdAt: '', updatedAt: ''}]
}


export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      genreAPI.endpoints.getGenre.matchFulfilled,
      (state, { payload }) => {
        state.genre.genre = payload.genre
      }
    )
    builder.addMatcher(
      genreAPI.endpoints.getAllGenre.matchFulfilled,
      (state, { payload }) => {
        state.allGenre = payload !== null ? payload : [{id: 0,name: '', code: '',createdAt: '', updatedAt: ''}]
      }
    )
  }
})

export default genreSlice.reducer
