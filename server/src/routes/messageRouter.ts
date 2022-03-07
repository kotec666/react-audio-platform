import express from 'express'

const router = express.Router()

import messageValidator from '../validators/messageValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import messageController from '../controllers/messageController'

router.post(
  '/add',
  checkRoleMiddleware.checkRole(['USER', 'SINGER', 'ADMIN']),
  messageValidator.checkCreateMessage(),
  expressValidatorMiddleware.handleValidationError,
  messageController.addOne
)

router.get(
  '/getMessagesByConvId/:conversationId',
  checkRoleMiddleware.checkRole(['USER', 'SINGER', 'ADMIN']),
  messageValidator.checkGetMessagesByConvId(),
  expressValidatorMiddleware.handleValidationError,
  messageController.getMessagesByConvId
)

export default router
