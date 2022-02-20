import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import albumReducer from './reducers/AlbumSlice'
import genreReducer from './reducers/GenreSlice'
import singerReducer from './reducers/SingerSlice'
import trackReducer from './reducers/TrackSlice'
import playerReducer from './reducers/PlayerReducer'
import { userAPI } from '../servicesAPI/UserService'
import { albumAPI } from '../servicesAPI/AlbumService'
import { genreAPI } from '../servicesAPI/GenreService'
import { singerAPI } from '../servicesAPI/SingerService'
import { trackAPI } from '../servicesAPI/TrackService'

const rootReducer = combineReducers({
  userReducer,
  albumReducer,
  genreReducer,
  singerReducer,
  trackReducer,
  playerReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [albumAPI.reducerPath]: albumAPI.reducer,
  [genreAPI.reducerPath]: genreAPI.reducer,
  [singerAPI.reducerPath]: singerAPI.reducer,
  [trackAPI.reducerPath]: trackAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(userAPI.middleware, albumAPI.middleware, genreAPI.middleware, singerAPI.middleware, trackAPI.middleware))
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
