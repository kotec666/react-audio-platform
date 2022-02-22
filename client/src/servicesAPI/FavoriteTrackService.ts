import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IFavoriteTrack } from '../models/IFavoriteTrack'
import { getAccessCookie, getRefreshCookie } from '../utils/cookie'
import { IFavorite } from '../models/IFavorite'

export const favoriteTrackAPI = createApi({
    reducerPath: 'favoriteTrackAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api`, prepareHeaders(headers) {return headers}, credentials: 'include'}),
    tagTypes: ['FavoriteTrack'],
    endpoints: (build) => ({
        getFavoriteTrack: build.query<IFavoriteTrack, { favoriteId: number }>({
            query: ({favoriteId}) => ({
                url: `/favoriteTrack/getAll/?_favoriteId=${favoriteId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                }
            }),
            providesTags: result => ['FavoriteTrack']
        }),
        addFavorite: build.mutation<IFavorite, {trackId: number, favoriteId: number}>({
            query: (favorite) => ({
                url: `/favoriteTrack/add`,
                method: 'POST',
                body: favorite,
                headers: {
                    'Authorization': `${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['FavoriteTrack']
        }),
        deleteFavorite: build.mutation<IFavorite, {trackId: number, favoriteId: number}>({
            query: (favorite) => ({
                url: `/favoriteTrack/delete`,
                method: 'DELETE',
                body: favorite,
                headers: {
                    'Authorization': `${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['FavoriteTrack']
        }),
   //     loginUser: build.mutation<ILoginUserRes, ILoginUserReq>({
   //         query: (user) => ({
   //             url: `/user/login`,
   //             method: 'POST',
   //             body: user
   //         }),
   //         invalidatesTags: ['Album']
   //     }),
   //     refreshUser: build.query<IRefreshUserRes, IRefreshUserReq>({
   //         query: () => ({
   //             url: `/user/refresh`,
   //             method: 'GET',
   //             headers: {
   //                 'cookie': `${getRefreshCookie()}`,
   //             },
   //         }),
   //         providesTags: result => ['Album']
   //     }),
    })
})
