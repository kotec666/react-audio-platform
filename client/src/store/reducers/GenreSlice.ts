import { createSlice } from '@reduxjs/toolkit'
import { IGenre } from '../../models/IGenre'
import { genreAPI } from '../../servicesAPI/GenreService'


interface GenreState {
  genre: IGenre
  isLoading: boolean
  error: string
}

const initialState: GenreState = {
  genre: { genre: { count: 0, rows: [] } },
  isLoading: false,
  error: ''
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
  }
})

export default genreSlice.reducer
