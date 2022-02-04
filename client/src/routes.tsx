import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import AdminPage from './pages/AdminPage/AdminPage'
import {
    ADMIN_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
} from './utils/consts'
import React from 'react'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage />
    },
    {
        path: PROFILE_ROUTE,
        Component: <ProfilePage />
    },
]


export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage />
    },
    {
        path: LOGIN_ROUTE,
        Component: <LoginPage />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <RegistrationPage />
    },
]

