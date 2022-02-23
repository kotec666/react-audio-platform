import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IAllGenre, IGenre } from '../models/IGenre'
import { getAccessCookie } from '../utils/cookie'

export const genreAPI = createApi({
    reducerPath: 'genreAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api/genre`}),
    tagTypes: ['Genre'],
    endpoints: (build) => ({
        getGenre: build.query<IGenre, { limit: number, page: number, search: string}>({
            query: ({limit, page, search}) => ({
                url: `/getAllByPage/?_limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${getAccessCookie()}`,
                  'cookie': `${getAccessCookie()}`
                }
            }),
            providesTags: result => ['Genre']
        }),
        getTracksByCode: build.query<IGenre, { code: string}>({
              query: ({code}) => ({
                  url: `/getTracksByCode/${code}`,
                  method: 'GET',
              }),
              providesTags: result => ['Genre']
          }),
        getAllGenre: build.query<IAllGenre[], ''>({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            providesTags: result => ['Genre']
        }),
        deleteGenre: build.mutation<IGenre, {genreId: number}>({
            query: ({genreId}) => ({
                url: `/delete/${genreId}`,
                method: 'DELETE',
                headers: {
                 Authorization: `Bearer ${getAccessCookie()}`,
                  'cookie': `${getAccessCookie()}`
                }
            }),
            invalidatesTags: result => ['Genre']
        }),
        addGenre: build.mutation<IGenre, {name: string, code: string}>({
          query: (genre) => ({
            url: `/add`,
            method: 'POST',
            body: genre,
            headers: {
              Authorization: `Bearer ${getAccessCookie()}`,
              'cookie': `${getAccessCookie()}`
            }
          }),
         invalidatesTags: result => ['Genre']
       }),
    })
})
