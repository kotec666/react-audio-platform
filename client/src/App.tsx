import React, { useEffect } from 'react'
import s from './App.module.scss'
import { AppRouter } from './components/AppRouter'
import Navbar from './components/Navbar/Navbar'
import ActiveTrack from './components/ActiveTrack/ActiveTrack'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { getAccessCookie, removeAccessCookie, setAccessCookie } from './utils/cookie'
import { userAPI } from './servicesAPI/UserService'
import { setUser } from './store/reducers/UserSlice'
import { trackAPI } from './servicesAPI/TrackService'


function App() {
  const dispatch = useAppDispatch()
  const {accessToken} = useAppSelector(state => state.userReducer)

   userAPI.useGetUserQuery('')

  const {active} = useAppSelector(state => state.playerReducer)
  const {user} = useAppSelector(state => state.userReducer)

  const {data: favoriteId} = trackAPI.useGetFavoriteIdQuery({userId: user?.id})
  trackAPI.useGetRecentlyIdQuery({userId: user?.id})
  trackAPI.useGetFavoriteTrackQuery({favoriteId: favoriteId ? favoriteId.id : 0})

  // favoriteAPI.useGetFavoriteQuery({page: 1, limit: 1, search: '', userId: user ? user.id : 0})
  // const { favoriteId } = useAppSelector(state => state.favoriteReducer)

  useEffect(() => {
    const accessCookie = getAccessCookie()
    if(accessCookie)
        dispatch(setUser(accessCookie))
    console.log(accessCookie)
  }, [])

  useEffect(() => {
    console.log('Token refreshed')
    const authStatus = !!accessToken

    if(authStatus) {
      if (accessToken) {
        setAccessCookie(accessToken)
      } else {
        removeAccessCookie()
      }
    }
    else {
      removeAccessCookie()
    }
  }, [accessToken])

  return (
    <div className={s.App}>
      <div className={s.navBar}>
         <Navbar />
      </div>
      <div className={s.pageWrapper}>
        <AppRouter/>
      </div>
      {
        active
          ? <div className={s.activeTrack}>
              <ActiveTrack />
            </div>
          : null
      }
    </div>
  )
}

export default App
