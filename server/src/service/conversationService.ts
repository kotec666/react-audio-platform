import { Conversation } from '../models/models'
import ApiError from '../error/ApiError'


class ConversationService {

  async addConversation(firstMemberId:number, secondMemberId:number) {
    const candidate = await Conversation.findOne({ where: { firstMemberId: firstMemberId, secondMemberId: secondMemberId } })
    if (candidate) {
      return ApiError.badRequest('Диалог уже существует')
    }

    const conversation = await Conversation.create({ firstMemberId: firstMemberId, secondMemberId: secondMemberId, userId: firstMemberId })
    return { conversation: conversation }
  }

  async getConvByUserId(userId: number) {
    const conversation = await Conversation.findOne({ where: { userId: userId }, order: [['id', 'DESC']] })
    return { conversation: conversation }
  }

  async findConvByTwoIds(firstMemberId: number, secondMemberId: number) {
    const conversation = await Conversation.findOne({ where: { firstMemberId: firstMemberId, secondMemberId: secondMemberId }, order: [['id', 'DESC']] })
    return { conversation: conversation }
  }

}

export default new ConversationService()
