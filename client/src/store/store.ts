import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import albumReducer from './reducers/AlbumSlice'
import genreReducer from './reducers/GenreSlice'
import singerReducer from './reducers/SingerSlice'
import trackReducer from './reducers/TrackSlice'
import playerReducer from './reducers/PlayerReducer'
import favoriteReducer from './reducers/FavoriteSlice'
import favoriteTrackReducer from './reducers/FavoriteTrackSlice'
import applicationReducer from './reducers/ApplicationSlice'
import { userAPI } from '../servicesAPI/UserService'
import { albumAPI } from '../servicesAPI/AlbumService'
import { genreAPI } from '../servicesAPI/GenreService'
import { singerAPI } from '../servicesAPI/SingerService'
import { trackAPI } from '../servicesAPI/TrackService'
import { favoriteAPI } from '../servicesAPI/FavoriteService'
import { favoriteTrackAPI } from '../servicesAPI/FavoriteTrackService'
import { applicationAPI } from '../servicesAPI/ApplicationService'

const rootReducer = combineReducers({
  userReducer,
  albumReducer,
  genreReducer,
  singerReducer,
  trackReducer,
  playerReducer,
  favoriteReducer,
  favoriteTrackReducer,
  applicationReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [albumAPI.reducerPath]: albumAPI.reducer,
  [genreAPI.reducerPath]: genreAPI.reducer,
  [singerAPI.reducerPath]: singerAPI.reducer,
  [trackAPI.reducerPath]: trackAPI.reducer,
  [favoriteAPI.reducerPath]: favoriteAPI.reducer,
  [favoriteTrackAPI.reducerPath]: favoriteTrackAPI.reducer,
  [applicationAPI.reducerPath]: applicationAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(
      userAPI.middleware,
      albumAPI.middleware,
      genreAPI.middleware,
      singerAPI.middleware,
      trackAPI.middleware,
      favoriteAPI.middleware,
      favoriteTrackAPI.middleware,
      applicationAPI.middleware,
    ))
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
