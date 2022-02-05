import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import s from './LoginPage.module.scss'
import google from './../../utils/icons/google.png'
import github from './../../utils/icons/github.png'
import vk from './../../utils/icons/vk.png'
import { REGISTRATION_ROUTE } from '../../utils/consts'

const LoginPage = () => {
  // const user = {
  //   id: 1,
  //   name: 'sta'
  // }
  //
  // if (user) {
  //   return (
  //     <Navigate to={HOME_ROUTE} />
  //   )
  // }

  const location = useLocation()
  const currentPath = location.pathname.split('/')
  const [page, setPage] = useState('')

  useEffect(() => {
    setPage(currentPath[1])
    console.log(page)
  }, [location])

    return (
      <div className={s.pageWrapper}>
        <div className={s.contentWrapper}>
          <form>
            <input type="text" placeholder={'Логин...'}/>
            <input type="text" placeholder={'Пароль...'}/>
            {
              page === REGISTRATION_ROUTE.slice(1)
                ?
                <input type="text" placeholder={'Email...'}/>
                : null
            }
            <div className={s.anotherMethod}>
              <span>Или войти с помощью</span>
              <hr/>
            </div>
            <div className={s.loginIcons}>
              <img src={google} alt="loginMethod"/>
              <img src={vk} alt="loginMethod"/>
              <img src={github} alt="loginMethod"/>
            </div>
            {
              page === REGISTRATION_ROUTE.slice(1)
                ?
                  <button>Регистрация</button>
                : <button>Вход</button>
            }
          </form>
        </div>
      </div>
    )
}

export default LoginPage
