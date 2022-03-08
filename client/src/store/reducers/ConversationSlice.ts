import { createSlice } from '@reduxjs/toolkit'
import {
  IConversation,
  IConversationData,
  IConversationUsers,
  IConversationUsersData
} from '../../models/IConversation'
import { IMessage } from '../../models/IMessage'
import { conversationAPI } from '../../servicesAPI/ConversationService'

interface ConversationState {
  conversation: IConversation
  activeConversation: IConversationData
  conversationUsers: IConversationUsers
  convUser: IConversationUsersData
  message: IMessage
  isLoading: boolean
  error: string
}

const initialState: ConversationState = {
  conversation: {
    conversation: [{
      id: 0,
      firstMemberId: 0,
      secondMemberId: 0,
      createdAt: '',
      updatedAt: '',
      userId: 0
    }]
  },
  activeConversation: { id: 0, firstMemberId: 0, secondMemberId: 0, createdAt: '', updatedAt: '', userId: 0 },
  conversationUsers: { user: [{ id: 0, login: '', role: '', pseudonym: '' }] },
  message: { message: [{ id: 0, text: '', createdAt: '', updatedAt: '', userId: 0, conversationId: 0 }] },
  convUser: { id: 0, login: '', pseudonym: '', role: '' },
  isLoading: false,
  error: ''
}


export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    clearConversation(state) {
      state.activeConversation = { id: 0, firstMemberId: 0, secondMemberId: 0, createdAt: '', updatedAt: '', userId: 0 }
    },
    setActiveConversation(state, { payload }) {
      state.activeConversation = payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      conversationAPI.endpoints.getConversationByUserId.matchFulfilled,
      (state, { payload }) => {
        state.conversation.conversation = payload !== null ? payload.conversation : [{
          id: 0,
          firstMemberId: 0,
          secondMemberId: 0,
          createdAt: '',
          updatedAt: '',
          userId: 0
        }]
      }
    )
    builder.addMatcher(
      conversationAPI.endpoints.getConversationByTwoIds.matchFulfilled,
      (state, { payload }) => {
        state.conversation.conversation = payload !== null ? payload.conversation : [{
          id: 0,
          firstMemberId: 0,
          secondMemberId: 0,
          createdAt: '',
          updatedAt: '',
          userId: 0
        }]
      }
    )
    builder.addMatcher(
      conversationAPI.endpoints.getMessagesByConvId.matchFulfilled,
      (state, { payload }) => {
        state.message.message = payload !== null ? payload.message : [{
          id: 0,
          text: '',
          createdAt: '',
          updatedAt: '',
          userId: 0,
          conversationId: 0
        }]
      }
    )
    builder.addMatcher(
      conversationAPI.endpoints.getConversationUsers.matchFulfilled,
      (state, { payload }) => {
        state.conversationUsers.user = payload !== null ? payload.user : [{ id: 0, login: '', role: '', pseudonym: '' }]
      }
    )
    builder.addMatcher(
      conversationAPI.endpoints.getConvUserData.matchFulfilled,
      (state, { payload }) => {
        state.convUser = payload !== null ? payload : { id: 0, login: '', pseudonym: '', role: '' }
      }
    )
  }
})

export const { clearConversation, setActiveConversation } = conversationSlice.actions
export default conversationSlice.reducer
