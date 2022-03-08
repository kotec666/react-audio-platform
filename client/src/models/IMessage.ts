export interface IMessage {
  message: IMessageData[]
}

export interface IMessageData {
  id: number
  text: string
  createdAt: string
  updatedAt: string
  userId: number
  conversationId: number
}
