import {
  createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IApplication } from '../models/IApplication'
import { getAccessCookie } from '../utils/cookie'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { clearUser, tokenReceived } from '../store/reducers/UserSlice'


const baseQuery = fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api`, prepareHeaders(headers) {return headers}, credentials: 'include'})
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
  > = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data as string))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(clearUser())
    }
  }
  return result
}

export const applicationAPI = createApi({
  reducerPath: 'applicationAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Application'],
  endpoints: (build) => ({
    getApplication: build.query<IApplication, ''>({
      query: () => ({
        url: `/application/getAll`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAccessCookie()}`,
        }
      }),
      providesTags: result => ['Application']
    }),
    sendApplication: build.mutation<IApplication, { userId: number, pseudonym: string }>({
      query: (data) => ({
        url: `/application/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: result => ['Application']
    }),
    deleteApplication: build.mutation<IApplication, {userId: number}>({
      query: ({userId}) => ({
        url: `/application/delete/${userId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getAccessCookie()}`,
        }
      }),
      invalidatesTags: ['Application']
    }),
    acceptApplication: build.mutation<IApplication, { userId: number, pseudonym: string }>({
      query: (user) => ({
        url: `/application/accept`,
        method: 'PUT',
        body: user,
        headers: {
          Authorization: `Bearer ${getAccessCookie()}`,
          'cookie': `${getAccessCookie()}`
        }
      }),
      invalidatesTags: result => ['Application']
    })
  })
})
