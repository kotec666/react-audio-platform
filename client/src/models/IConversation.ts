export interface IConversation {
  conversation: IConversationData[]
}

export interface IConversationData {
  id: number
  firstMemberId: number
  secondMemberId: number
  createdAt: string
  updatedAt: string
  userId: number
}

export interface IConversationUsersData {
  id: number
  login: string
  role: string
  pseudonym: string
}

export interface IConversationUsers {
  user: IConversationUsersData[]
}
