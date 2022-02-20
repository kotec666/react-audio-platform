import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IAlbum } from '../models/IAlbum'

export const albumAPI = createApi({
    reducerPath: 'albumAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api/album`}),
    tagTypes: ['Album'],
    endpoints: (build) => ({
        getAlbum: build.query<IAlbum, { limit: number, page: number, search: string}>({
            query: ({limit, page, search}) => ({
                url: `/getAllByPage/?_limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            providesTags: result => ['Album']
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
