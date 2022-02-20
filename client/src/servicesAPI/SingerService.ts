import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { ISinger } from '../models/ISinger'

export const singerAPI = createApi({
    reducerPath: 'singerAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api/user`}),
    tagTypes: ['Singer'],
    endpoints: (build) => ({
        getSinger: build.query<ISinger, { limit: number, page: number, search: string}>({
            query: ({limit, page, search}) => ({
                url: `/getAllByPage/?_limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            providesTags: result => ['Singer']
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
