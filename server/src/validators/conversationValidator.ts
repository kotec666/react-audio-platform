import { body, header, param } from 'express-validator'

class ConversationValidator {
  checkCreateConversation() {
    return [
      body('firstMemberId')
        .notEmpty(),
      body('secondMemberId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkGetConvByUser() {
    return [
      param('userId')
        .notEmpty(),
      header('Authorization')
    ]
  }


  checkFindConvByUsers() {
    return [
      param('firstMemberId')
        .notEmpty(),
      param('secondMemberId')
        .notEmpty(),
      header('Authorization')
    ]
  }

}

export default new ConversationValidator()
