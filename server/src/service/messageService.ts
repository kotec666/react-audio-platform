import { Message } from '../models/models'

class MessageService {

  async addMessage(userId: number, text:string, conversationId: number) {
    const message = await Message.create({ userId: userId, text: text, conversationId: conversationId })
    return { message: message }
  }

  async getMessagesByConversationId(conversationId: number) {
    const message = await Message.findAll({ where: { conversationId: conversationId }, order: [['id', 'DESC']] })
    return { message: message }
  }

}

export default new MessageService()
