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
import { getRefreshCookie } from '../utils/cookie'
import { baseQueryWithReauth } from './UnauthorizedInterceptor'

// baseQuery: fetchBaseQuery({baseUrl: BASE_URL, prepareHeaders(headers) {return headers}, credentials: 'include'}),

// const baseQuery = fetchBaseQuery({baseUrl: 'http://localhost:5000/api/user', prepareHeaders(headers) {return headers}, credentials: 'include'})
// export const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
//   > = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)
//     if (result.error && result.error.status === 401) {
//         // try to get a new token
//         const refreshResult = await baseQuery({ url: 'http://localhost:5000/api/user/token/refresh/', method: 'POST' }, api, extraOptions);
//         if (refreshResult.data) {
//             // store the new token
//             api.dispatch(tokenReceived(refreshResult.data as string))
//             // retry the initial query
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(clearUser())
//         }
//     }
//     return result
// }


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (build) => ({
        loginUser: build.mutation<ILoginUserRes, ILoginUserReq>({
            query: (user) => ({
                url: `/user/login`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        registrationUser: build.mutation<IRegistrationUserRes, IRegistrationUserReq>({
            query: (user) => ({
                url: `/user/registration`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        logoutUser: build.mutation<ILogoutUserRes, string>({
            query: (user) => ({
                url: `/user/logout`,
                method: 'POST',
                body: user,
                headers: {
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['User']
        }),
        getUser: build.query<IUser, ''>({
            query: () => ({
                url: `/user/login/success`,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: ['User']
        }),
        refreshUser: build.query<IRefreshUserRes, IRefreshUserReq>({
            query: () => ({
                url: `/user/refresh`,
                method: 'GET',
                headers: {
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['User']
        }),
    })
})
