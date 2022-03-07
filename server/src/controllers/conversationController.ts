import { NextFunction, Request, Response } from 'express'
import conversationService from '../service/conversationService'

class ConversationController {

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstMemberId, secondMemberId } = req.body

      const conversation = await conversationService.addConversation(+firstMemberId, +secondMemberId)
      return res.json(conversation)
    } catch (e) {
      next(e)
    }
  }

  async getConvByUser(req: Request, res: Response, next: NextFunction) {
    try {
      let { userId } = req.params

      if (!userId) {
        return res.json('empty params')
      } else {
          const conversation = await conversationService.getConvByUserId(+userId)
          return res.json(conversation)
      }
    } catch (e) {
      next(e)
    }
  }

  async findConv(req: Request, res: Response, next: NextFunction) {
    try {
      let { firstMemberId, secondMemberId } = req.params

      if (!firstMemberId || !secondMemberId) {
        return res.json('empty params')
      } else {
          const conversation = await conversationService.findConvByTwoIds(+firstMemberId, +secondMemberId)
          return res.json(conversation)
      }
    } catch (e) {
      next(e)
    }

  }

}

export default new ConversationController()
