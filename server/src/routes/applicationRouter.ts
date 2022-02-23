import express from 'express'
const router = express.Router()

import applicationController from '../controllers/applicationController'
import ApplicationValidator from '../validators/applicationValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'

router.post(
  '/add',
       ApplicationValidator.checkCreateApplication(),
       expressValidatorMiddleware.handleValidationError,
       applicationController.addOne
)

router.delete(
  '/delete/:userId',
       checkRoleMiddleware.checkRole(['ADMIN']),
       ApplicationValidator.checkDeleteApplication(),
       expressValidatorMiddleware.handleValidationError,
       applicationController.deleteOne
)

router.put(
  '/accept',
        checkRoleMiddleware.checkRole(['ADMIN']),
        ApplicationValidator.checkAcceptOneApplication(),
        expressValidatorMiddleware.handleValidationError,
        applicationController.acceptOne
)

router.get(
  '/getAll',
        checkRoleMiddleware.checkRole(['ADMIN']),
        applicationController.getAll
)


export default router
