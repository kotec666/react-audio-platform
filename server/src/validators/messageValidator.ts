import { body, header, param, query } from 'express-validator'

class MessageValidator {

  checkCreateMessage() {
    return [
      body('userId')
        .notEmpty(),
      body('text')
        .notEmpty(),
      body('conversationId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkGetMessagesByConvId() {
    return [
      param('conversationId')
        .notEmpty(),
      header('Authorization')
    ]
  }


}

export default new MessageValidator()
