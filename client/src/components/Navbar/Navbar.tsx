import React from 'react'
import s from './Navbar.module.scss'
import search from './../../utils/icons/search.png'
import person from './../../utils/icons/person.png'
import enter from './../../utils/icons/enter.png'
import registration from './../../utils/icons/registration.png'
import album from './../../utils/icons/album.png'
import applications from './../../utils/icons/applications.png'
import genre from './../../utils/icons/genre.png'
import heart from './../../utils/icons/heart.png'
import logout from './../../utils/icons/logout.png'
import microphone from './../../utils/icons/microphone.png'
import recently from './../../utils/icons/recently.png'
import { NavLink } from 'react-router-dom'
import {
  ADMIN_ROUTE, ALBUM_ROUTE, APPLICATIONS_ROUTE,
  FAVORITE_ROUTE, GENRE_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE, RECENTLY_ROUTE,
  REGISTRATION_ROUTE, SINGERS_ROUTE
} from '../../utils/consts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { clearUser } from '../../store/reducers/UserSlice'
import { userAPI } from '../../servicesAPI/UserService'

const Navbar = () => {
  const {user, isAuth} = useAppSelector(state => state.userReducer)
  const [logoutUser] = userAPI.useLogoutUserMutation()

  const dispatch = useAppDispatch()


  const handleLogoutUser = async () => {
    await logoutUser('').unwrap()
    dispatch(clearUser())
  }

    return (
      <>

      <h5 className={s.websiteName}>
        React Audio Platform
      </h5>

        <div className={s.wrapper}>

          <>

            {
              isAuth && isAuth
                ?
                <>
                  <NavLink to={PROFILE_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={person} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Профиль</div>
                  </NavLink>
                  <NavLink to={FAVORITE_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={heart} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Любимые треки</div>
                  </NavLink>
                  <NavLink to={RECENTLY_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={recently} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Недавно прослушано</div>
                  </NavLink>
                  <NavLink to={HOME_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={search} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Поиск</div>
                  </NavLink>
                  <NavLink to={ALBUM_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={album} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Альбомы</div>
                  </NavLink>
                  <NavLink to={SINGERS_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={microphone} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Исполнители</div>
                  </NavLink>
                  <NavLink to={GENRE_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={genre} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Жанры</div>
                  </NavLink>
                  <div className={s.linkWrapper} onClick={handleLogoutUser}>
                    <div className={s.iconWrapper}>
                      <img src={logout} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Выход</div>
                  </div>
                  {
                    user.role === 'ADMIN' ?
                      <>
                        <NavLink to={ADMIN_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                          <div className={s.iconWrapper}>
                            <img src={person} alt="icon"/>
                          </div>
                          <div className={s.linkName}>Админ</div>
                        </NavLink>
                        <NavLink to={APPLICATIONS_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                          <div className={s.iconWrapper}>
                            <img src={applications} alt="icon"/>
                          </div>
                          <div className={s.linkName}>Заявки</div>
                        </NavLink>
                      </>
                       : null
                  }
                </>
                :
                <>
                  <NavLink to={HOME_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={search} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Поиск</div>
                  </NavLink>
                  <NavLink to={ALBUM_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={album} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Альбомы</div>
                  </NavLink>
                  <NavLink to={SINGERS_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={microphone} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Исполнители</div>
                  </NavLink>
                  <NavLink to={GENRE_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={genre} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Жанры</div>
                  </NavLink>
                  <NavLink to={LOGIN_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={enter} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Вход</div>
                  </NavLink>
                  <NavLink to={REGISTRATION_ROUTE} className={({ isActive }) => isActive ? s.linkActive : s.linkWrapper}>
                    <div className={s.iconWrapper}>
                      <img src={registration} alt="icon"/>
                    </div>
                    <div className={s.linkName}>Регистрация</div>
                  </NavLink>
                </>
            }
          </>

        </div>

      </>
    )
}

export default Navbar
