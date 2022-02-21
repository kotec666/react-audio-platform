import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IFavoriteTrack } from '../models/IFavoriteTrack'
import { getAccessCookie } from '../utils/cookie'

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
