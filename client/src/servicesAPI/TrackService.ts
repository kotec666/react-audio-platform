import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { ITrack } from '../models/ITrack'

export const trackAPI = createApi({
    reducerPath: 'trackAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api/track`}),
    tagTypes: ['Track'],
    endpoints: (build) => ({
        getTrack: build.query<ITrack, { limit: number, page: number, search: string}>({
            query: ({limit, page, search}) => ({
                url: `/getAllByPage/?_limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            providesTags: result => ['Track']
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
