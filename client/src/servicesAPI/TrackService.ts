import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { ITrack } from '../models/ITrack'
import { getAccessCookie, getRefreshCookie } from '../utils/cookie'
import { IFavorite, IFavoriteId } from '../models/IFavorite'
import { IFavoriteTrack } from '../models/IFavoriteTrack'
import { IRecently, IRecentlyId } from '../models/IRecently'
import { IAlbum } from '../models/IAlbum'
import { IAllGenre, IGenre } from '../models/IGenre'
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

export const trackAPI = createApi({
    reducerPath: 'trackAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Track', 'Favorite', 'FavoriteTrack', 'Recently', 'RecentlyTrack', 'Album', 'AlbumTracks', 'Genre'],
    endpoints: (build) => ({
        getTrack: build.query<ITrack, { limit: number, page: number, search: string}>({
            query: ({limit, page, search}) => ({
                url: `/track/getAllByPage/?_limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            providesTags: result => ['Track']
        }),
        deleteTrack: build.mutation<ITrack, { trackId: number }>({
            query: (trackId) => ({
                url: `/track/delete`,
                method: 'DELETE',
                body: trackId,
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: result => ['Track', 'Favorite', 'FavoriteTrack', 'Recently', 'RecentlyTrack', 'Album', 'AlbumTracks', 'Genre']
        }),
        addTrack: build.mutation<ITrack, FormData>({
            query: (trackData) => ({
                url: `/track/add`,
                method: 'POST',
                body: trackData,
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                    'cookie': `${getAccessCookie()}`
                }
            }),
            invalidatesTags: result => ['Track']
        }),
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
        addFavorite: build.mutation<IFavorite, {trackId: number, favoriteId: number}>({
            query: (favorite) => ({
                url: `/favoriteTrack/add`,
                method: 'POST',
                body: favorite,
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['Favorite', 'FavoriteTrack']
        }),
        deleteFavorite: build.mutation<IFavorite, {trackId: number, favoriteId: number}>({
            query: (favorite) => ({
                url: `/favoriteTrack/delete`,
                method: 'DELETE',
                body: favorite,
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['Favorite', 'FavoriteTrack']
        }),
        getRecently: build.query<IRecently, { limit: number, page: number, search: string, userId: number}>({
            query: ({limit, page, search, userId}) => ({
                url: `/recently/getAllByPage/?_limit=${limit}&page=${page}&userId=${userId}&search=${search}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                }
            }),
            providesTags: result => ['Recently']
        }),
        getRecentlyId: build.query<IRecentlyId, { userId: number }>({
            query: ({userId}) => ({
                url: `/recently/getRecentlyIdByUserId/?_userId=${userId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                }
            }),
            providesTags: result => ['Recently']
        }),
        addRecently: build.mutation<IRecently, {trackId: number, recentlyId: number}>({
            query: (recently) => ({
                url: `/recentlyTrack/add`,
                method: 'POST',
                body: recently,
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['Recently', 'RecentlyTrack']
        }),
        deleteRecently: build.mutation<IRecently, {trackId: number, recentlyId: number}>({
            query: (recently) => ({
                url: `/recentlyTrack/delete`,
                method: 'DELETE',
                body: recently,
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: ['Recently', 'RecentlyTrack']
        }),
        addAlbum: build.mutation<IAlbum, FormData>({
            query: (albumData) => ({
                url: `/album/add`,
                method: 'POST',
                body: albumData,
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                    'cookie': `${getAccessCookie()}`
                }
            }),
            invalidatesTags: result => ['Album']
        }),
        getAlbum: build.query<IAlbum, { limit: number, page: number, search: string}>({
            query: ({limit, page, search}) => ({
                url: `/album/getAllByPage/?_limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            providesTags: result => ['Album']
        }),
        getTracksByAlbumId: build.query<IAlbum, { limit: number, page: number, albumId: number, search: string}>({
            query: ({limit, page, albumId, search}) => ({
                url: `/album/getTracksByAlbumId/?_limit=${limit}&page=${page}&albumId=${albumId}&search=${search}`,
                method: 'GET',
            }),
            providesTags: result => ['AlbumTracks']
        }),
        getGenre: build.query<IGenre, { limit: number, page: number, search: string}>({
            query: ({limit, page, search}) => ({
                url: `/genre/getAllByPage/?_limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getAccessCookie()}`,
                    'cookie': `${getAccessCookie()}`
                }
            }),
            providesTags: result => ['Genre']
        }),
        getTracksByCode: build.query<IGenre, { limit: number, page: number, search: string, code: string}>({
            query: ({limit, page, code, search }) => ({
                url: `/genre/getTracksByCode/?_limit=${limit}&page=${page}&code=${code}&search=${search}`,
                method: 'GET',
            }),
            providesTags: result => ['Genre']
        }),
        getAllGenre: build.query<IAllGenre[], ''>({
            query: () => ({
                url: `/genre/getAll`,
                method: 'GET',
            }),
            providesTags: result => ['Genre']
        }),
        deleteGenre: build.mutation<IGenre, {genreId: number}>({
            query: ({genreId}) => ({
                url: `/genre/delete/${genreId}`,
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
                url: `/genre/add`,
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
