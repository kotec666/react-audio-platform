import React from 'react'
import s from './Navbar.module.scss'
import {NavLink} from 'react-router-dom'
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
} from '../../utils/consts'


const Navbar = () => {
  const isAuth = false


  const user = {
    role: 'ADMIN'
  }
    return (
        <div className={s.wrapper}>
            <>
            {
                isAuth && isAuth
                    ?
                    <>
                        <NavLink to={PROFILE_ROUTE} className={({ isActive }) => isActive ? s.link__active : ''}>Профиль</NavLink>
                        {
                            user.role === 'ADMIN' ?
                                <NavLink to={ADMIN_ROUTE} className={({ isActive }) => isActive ? s.link__active : ''}>Админ</NavLink> : null
                        }
                    </>
                    :
                    <>
                        <NavLink to={LOGIN_ROUTE} className={({ isActive }) => isActive ? s.link__active : ''}>Вход</NavLink>
                        <NavLink to={REGISTRATION_ROUTE} className={({ isActive }) => isActive ? s.link__active : ''}>Регистрация</NavLink>
                    </>
            }
            </>
        </div>
    )
}

export default Navbar
