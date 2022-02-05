import React from 'react'
import ApplicationsPage from './pages/ApplicationsPage/ApplicationsPage'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import LoginPage from './pages/LoginPage/LoginPage'
import AdminPage from './pages/AdminPage/AdminPage'
import {
    ADMIN_ROUTE,
    ALBUM_ROUTE,
    APPLICATIONS_ROUTE,
    GENRE_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    SINGERS_ROUTE,
    RECENTLY_ROUTE,
    FAVORITE_ROUTE,
} from './utils/consts'
import GenresPage from './pages/GenresPage/GenresPage'
import AlbumsPage from './pages/AlbumsPage/AlbumsPage'
import SingersPage from './pages/SingersPage/SingersPage'
import TracksList from './components/TracksList/TracksList'


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage />
    },
    {
        path: PROFILE_ROUTE,
        Component: <ProfilePage />
    },
    {
        path: APPLICATIONS_ROUTE,
        Component: <ApplicationsPage />
    },
    {
        path: RECENTLY_ROUTE,
        Component: <TracksList />
    },
    {
        path: FAVORITE_ROUTE,
        Component: <TracksList />
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
        Component: <LoginPage />
    },
    {
        path: GENRE_ROUTE,
        Component: <GenresPage />
    },
    {
        path: GENRE_ROUTE + '/:slug',
        Component: <TracksList />
    },
    {
        path: ALBUM_ROUTE,
        Component: <AlbumsPage />
    },
    {
        path: ALBUM_ROUTE + '/:id',
        Component: <TracksList />
    },
    {
        path: SINGERS_ROUTE,
        Component: <SingersPage />
    },
    {
        path: SINGERS_ROUTE + '/:id',
        Component: <ProfilePage />
    },
]

