import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { IConversation, IConversationUsers, IConversationUsersData } from '../models/IConversation'
import { IMessage } from '../models/IMessage'
import { getAccessCookie, getRefreshCookie } from '../utils/cookie'
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
        const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
        if (refreshResult.data) {
            api.dispatch(tokenReceived(refreshResult.data as string))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(clearUser())
        }
    }
    return result
}

export const conversationAPI = createApi({
    reducerPath: 'conversationAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Conversation', 'Message', 'User'],
    endpoints: (build) => ({
        getConversationUsers: build.query<IConversationUsers, {}>({
            query: () => ({
                url: `/user/getAll`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['Conversation']
        }),
        getConversationByUserId: build.query<IConversation, { userId:number }>({
            query: ({ userId }) => ({
                url: `/conversation/getConvByUser/${userId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['Conversation']
        }),
        getConversationByTwoIds: build.query<IConversation, { firstMemberId:number, secondMemberId:number, }>({
            query: ({ firstMemberId, secondMemberId }) => ({
                url: `/conversation/findConv/${firstMemberId}/${secondMemberId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['Conversation']
        }),
        addConversation: build.mutation<IConversation, { firstMemberId:number, secondMemberId:number }>({
            query: (data) => ({
                url: `/conversation/add`,
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: result => ['Conversation']
        }),
        addMessage: build.mutation<IMessage, { userId:number, text:string, conversationId:number }>({
            query: (data) => ({
                url: `/message/add`,
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            invalidatesTags: result => ['Message']
        }),
        getMessagesByConvId: build.query<IMessage, { conversationId: number }>({
            query: ({ conversationId }) => ({
                url: `/message/getMessagesByConvId/${conversationId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['Message']
        }),
        getConvUserData: build.query<IConversationUsersData, { userId: number }>({
            query: ({ userId }) => ({
                url: `/user/getUserDataByUserId/${userId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAccessCookie()}`,
                    'cookie': `${getRefreshCookie()}`,
                },
            }),
            providesTags: result => ['User']
        }),
    })
})
