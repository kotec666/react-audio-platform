import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import s from './LoginPage.module.scss'
import google from './../../utils/icons/google.png'
import github from './../../utils/icons/github.png'
import vk from './../../utils/icons/vk.png'
import { HOME_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { useAppSelector } from '../../hooks/redux'
import { userAPI } from '../../servicesAPI/UserService'
import { ILoginUserReq, IRegistrationUserReq } from '../../models/IUser'

const LoginPage = () => {
  const {isAuth} = useAppSelector(state => state.userReducer)
  const [loginUser] = userAPI.useLoginUserMutation()
  const [registrationUser] = userAPI.useRegistrationUserMutation()

  const location = useLocation()
  const currentPath = location.pathname.split('/')
  const [page, setPage] = useState('')

  useEffect(() => {
    setPage(currentPath[1])
  }, [location])

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registrationHandler = async () => {
    await registrationUser({login, password, email} as IRegistrationUserReq).unwrap()
    await loginUser({login, password} as ILoginUserReq).unwrap()
  }

  const loginHandler = async () => {
    await loginUser({login, password} as ILoginUserReq).unwrap()
  }

    if (isAuth === true) {
      return (
        <Navigate to={HOME_ROUTE} />
      )
    }

    const googleAuthHandler = () => {
      window.open(`${process.env.REACT_APP_API_URL}/api/user/google`, '_self')
    }

    const githubAuthHandler = () => {
      window.open(`${process.env.REACT_APP_API_URL}/api/user/github`, '_self')
    }

    return (
      <div className={s.pageWrapper}>
        <div className={s.contentWrapper}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder={'Логин...'} onChange={(e) => setLogin(e.target.value)}  value={login}/>
            <input type="password" placeholder={'Пароль...'} onChange={(e) => setPassword(e.target.value)}  value={password}/>
            {
              page === REGISTRATION_ROUTE.slice(1)
                ?
                <input type="text" placeholder={'Email...'} onChange={(e) => setEmail(e.target.value)} value={email}/>
                : null
            }
            <div className={s.anotherMethod}>
              <span>Или войти с помощью</span>
              <hr/>
            </div>
            <div className={s.loginIcons}>
              <img src={google} alt="loginMethod" onClick={googleAuthHandler}/>
              <img src={vk} alt="loginMethod"/>
              <img src={github} alt="loginMethod" onClick={githubAuthHandler}/>
            </div>
            {
              page === REGISTRATION_ROUTE.slice(1)
                ?
                  <button onClick={registrationHandler}>Регистрация</button>
                : <button onClick={loginHandler}>Вход</button>
            }
          </form>
        </div>
      </div>
    )
}

export default LoginPage
