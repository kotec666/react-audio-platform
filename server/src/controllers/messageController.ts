import { NextFunction, Request, Response } from 'express'
import messageService from '../service/messageService'


class MessageController {

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, text, conversationId } = req.body

      const message = await messageService.addMessage(+userId, text, +conversationId)
      return res.json(message)
    } catch (e) {
      next(e)
    }
  }

  async getMessagesByConvId(req: Request, res: Response, next: NextFunction) {
    try {
      let { conversationId } = req.params

      if (!conversationId) {
        return res.json('empty params')
      } else {
          const message = await messageService.getMessagesByConversationId(+conversationId)
          return res.json(message)
      }
    } catch (e) {
      next(e)
    }
  }

}

export default new MessageController()
