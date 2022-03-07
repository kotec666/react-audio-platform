import express from 'express'

const router = express.Router()

import conversationValidator from '../validators/conversationValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import conversationController from '../controllers/conversationController'

router.post(
  '/add',
  checkRoleMiddleware.checkRole(['USER', 'SINGER', 'ADMIN']),
  conversationValidator.checkCreateConversation(),
  expressValidatorMiddleware.handleValidationError,
  conversationController.addOne
)

router.get(
  '/getConvByUser/:userId',
  checkRoleMiddleware.checkRole(['USER', 'SINGER', 'ADMIN']),
  conversationValidator.checkGetConvByUser(),
  expressValidatorMiddleware.handleValidationError,
  conversationController.getConvByUser
)

router.get('/findConv/:firstMemberId/:secondMemberId',
  checkRoleMiddleware.checkRole(['USER', 'SINGER', 'ADMIN']),
  conversationValidator.checkFindConvByUsers(),
  expressValidatorMiddleware.handleValidationError,
  conversationController.findConv
)

export default router
