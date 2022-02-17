import express from 'express'
const router = express.Router()

import TrackValidator from '../validators/trackValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import trackController from '../controllers/trackController'

router.post(
  '/add',
        checkRoleMiddleware.checkRole(['ADMIN', 'SINGER']),
        TrackValidator.checkCreateTrack(),
        expressValidatorMiddleware.handleValidationError,
        trackController.addOne
)

router.delete(
  '/delete',
        checkRoleMiddleware.checkRole(['ADMIN', 'SINGER']),
        TrackValidator.checkDeleteTrack(),
        expressValidatorMiddleware.handleValidationError,
        trackController.deleteOne
)


router.get(
  '/getAll',
        trackController.getAll
)

router.get(
  '/getAllByUserId',
        TrackValidator.checkGetByUserIdTrack(),
        expressValidatorMiddleware.handleValidationError,
        trackController.getAllByUser
)

router.get(
  '/getAllByPage',
        TrackValidator.checkGetByPage(),
        expressValidatorMiddleware.handleValidationError,
        trackController.getAllByPage
)

export default router
