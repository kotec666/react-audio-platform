import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IFavorite, IFavoriteId } from '../models/IFavorite'
import { getAccessCookie } from '../utils/cookie'

export const favoriteAPI = createApi({
    reducerPath: 'favoriteAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api`, prepareHeaders(headers) {return headers}, credentials: 'include'}),
    tagTypes: ['Favorite'],
    endpoints: (build) => ({
        getFavorite: build.query<IFavorite, { limit: number, page: number, search: string, userId: number}>({
            query: ({limit, page, search, userId}) => ({
                url: `/favorite/getAllByPage/?_limit=${limit}&page=${page}&userId=${userId}&search=${search}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                }
            }),
            providesTags: result => ['Favorite']
        }),
        getFavoriteId: build.query<IFavoriteId, { userId: number }>({
            query: ({userId}) => ({
                url: `/favorite/getFavoriteIdByUserId/?_userId=${userId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                }
            }),
            providesTags: result => ['Favorite']
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
