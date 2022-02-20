import { createSlice } from '@reduxjs/toolkit'
import {IAlbum} from '../../models/IAlbum'
import {albumAPI} from '../../servicesAPI/AlbumService'


interface AlbumState {
  album: IAlbum
  isLoading: boolean
  error: string
}

const initialState: AlbumState = {
  album: {album: {count: 0, rows: []}},
  isLoading: false,
  error: '',
}


export const albumSlice = createSlice({
  name:'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      albumAPI.endpoints.getAlbum.matchFulfilled,
      (state, { payload }) => {
        state.album.album = payload.album
      }
    )
  },
})

export default albumSlice.reducer
