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
import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const {isAuth} = useAppSelector(state => state.userReducer)
  const [loginUser, { isLoading: isLoadingLogin }] = userAPI.useLoginUserMutation()
  const [registrationUser, { isLoading: isLoadingRegistration }] = userAPI.useRegistrationUserMutation()

  const location = useLocation()
  const currentPath = location.pathname.split('/')
  const [page, setPage] = useState('')
  const [loginError, setLoginError] = useState('')
  const [regError, setRegError] = useState('')

  useEffect(() => {
    setPage(currentPath[1])
  }, [location])

  const {register: registerLogin, formState: { errors: errorsLogin }, handleSubmit: handleSubmitLogin} = useForm<ILoginUserReq>()
  const {register: registerRegistration, formState: { errors: errorsRegistration }, handleSubmit: handleSubmitRegistration} = useForm<IRegistrationUserReq>()

  const loginHandler = handleSubmitLogin( async ({login, password}) => {
    try {
      setLoginError('')
      await loginUser({login, password} as ILoginUserReq).unwrap()
    } catch (e) {
      setLoginError(e.data.message)
    }
  })

  const registrationHandler = handleSubmitRegistration( async ({login, password, email}) => {
    try {
      setRegError('')
      await registrationUser({login, password, email} as IRegistrationUserReq).unwrap()
      await loginUser({login, password} as ILoginUserReq).unwrap()
    } catch (e) {
      setRegError(e.data.message)
    }
  })

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
          {
            page === REGISTRATION_ROUTE.slice(1)
              ?
          <form onSubmit={registrationHandler}>
            <span className={s.errText}>{regError}</span>
            <input
              type="text"
              placeholder={'Логин...'}
              {...registerRegistration('login', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 4,
                  message: 'Минимум 4 символа'
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум 40 символов'
                }
              })}
            />
            {
              errorsRegistration?.login &&
              <div className={s.errText}>
                {errorsRegistration?.login.message}
              </div>
            }
            <input
              type="password"
              placeholder={'Пароль...'}
              {...registerRegistration('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 4,
                  message: 'Минимум 4 символа'
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум 40 символов'
                }
              })}
            />
            {
              errorsRegistration?.password &&
              <div className={s.errText}>
                {errorsRegistration?.password.message}
              </div>
            }
            <input
              type="text"
              placeholder={'Email...'}
              {...registerRegistration('email', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 4,
                  message: 'Минимум 4 символа'
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум 40 символов'
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Введенное значение не соответствует формату email'
                }
              })}
            />
            {
              errorsRegistration?.email &&
              <div className={s.errText}>
                {errorsRegistration?.email.message}
              </div>
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
            <button
              type='submit'
              disabled={isLoadingRegistration}
            >
              {isLoadingRegistration
                ?
                'Загрузка...'
                :
                'Регистрация'
              }
            </button>
          </form>
          :
              <form onSubmit={loginHandler}>
                <span className={s.errText}>{loginError}</span>
                <input
                  type="text"
                  placeholder={'Логин...'}
                  {...registerLogin('login', {
                    required: 'Поле обязательно для заполнения',
                    minLength: {
                      value: 4,
                      message: 'Минимум 4 символа'
                    },
                    maxLength: {
                      value: 40,
                      message: 'Максимум 40 символов'
                    }
                  })}
                />
                {
                  errorsLogin?.login &&
                  <div className={s.errText}>
                    {errorsLogin?.login.message}
                  </div>
                }
                <input
                  type="password"
                  placeholder={'Пароль...'}
                  {...registerLogin('password', {
                    required: 'Поле обязательно для заполнения',
                    minLength: {
                      value: 4,
                      message: 'Минимум 4 символа'
                    },
                    maxLength: {
                      value: 40,
                      message: 'Максимум 40 символов'
                    }
                  })}
                />
                {
                  errorsLogin?.password &&
                  <div className={s.errText}>
                    {errorsLogin?.password.message}
                  </div>
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
                <button
                  disabled={isLoadingLogin}
                  type='submit'
                >
                  {
                    isLoadingLogin
                    ?
                    'Загрузка...'
                    :
                    'Вход'
                  }
                </button>
              </form>
          }
        </div>
      </div>
    )
}

export default LoginPage
