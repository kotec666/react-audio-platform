import {
    createApi,
} from '@reduxjs/toolkit/dist/query/react'
import {
    ILoginUserReq,
    ILoginUserRes,
    ILogoutUserRes,
    IRefreshUserReq,
    IRefreshUserRes,
    IRegistrationUserReq,
    IRegistrationUserRes, IUser
} from '../models/IUser'
import { getAccessCookie, getRefreshCookie } from '../utils/cookie'
import { baseQueryWithReauth } from './UnauthorizedInterceptor'

// baseQuery: fetchBaseQuery({baseUrl: BASE_URL, prepareHeaders(headers) {return headers}, credentials: 'include'}),

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (build) => ({
        loginUser: build.mutation<ILoginUserRes, ILoginUserReq>({
            query: (user) => ({
                url: `/login`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        registrationUser: build.mutation<IRegistrationUserRes, IRegistrationUserReq>({
            query: (user) => ({
                url: `/registration`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        logoutUser: build.mutation<ILogoutUserRes, string>({
            query: (user) => ({
                url: `/logout`,
                method: 'POST',
                body: user,
                headers: {
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['User']
        }),
        fetchAllUsers: build.mutation<Array<IUser>, string>({
            query: () => ({
                url: `/getAll`,
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                },
            }),
            invalidatesTags: ['User']
        }),
        refreshUser: build.query<IRefreshUserRes, IRefreshUserReq>({
            query: () => ({
                url: `/refresh`,
                method: 'GET',
                headers: {
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['User']
        }),
    })
})
