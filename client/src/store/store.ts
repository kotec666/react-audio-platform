import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import albumReducer from './reducers/AlbumSlice'
import genreReducer from './reducers/GenreSlice'
import singerReducer from './reducers/SingerSlice'
import playerReducer from './reducers/PlayerReducer'
import favoriteReducer from './reducers/FavoriteSlice'
import applicationReducer from './reducers/ApplicationSlice'
import recentlyReducer from './reducers/RecentlySlice'
import conversationReducer from './reducers/ConversationSlice'
import { userAPI } from '../servicesAPI/UserService'
import { singerAPI } from '../servicesAPI/SingerService'
import { trackAPI } from '../servicesAPI/TrackService'
import { applicationAPI } from '../servicesAPI/ApplicationService'
import { conversationAPI } from '../servicesAPI/ConversationService'

const rootReducer = combineReducers({
  userReducer,
  albumReducer,
  genreReducer,
  singerReducer,
  playerReducer,
  favoriteReducer,
  applicationReducer,
  recentlyReducer,
  conversationReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [singerAPI.reducerPath]: singerAPI.reducer,
  [trackAPI.reducerPath]: trackAPI.reducer,
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [conversationAPI.reducerPath]: conversationAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(
      userAPI.middleware,
      singerAPI.middleware,
      trackAPI.middleware,
      applicationAPI.middleware,
      conversationAPI.middleware,
    ))
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
