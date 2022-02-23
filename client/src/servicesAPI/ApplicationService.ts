import {
  createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IApplication } from '../models/IApplication'
import { getAccessCookie } from '../utils/cookie'

export const applicationAPI = createApi({
  reducerPath: 'applicationAPI',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api`, prepareHeaders(headers) {return headers}, credentials: 'include'}),
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
