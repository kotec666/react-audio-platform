import express from 'express'
const router = express.Router()

import recentlyTrackValidator from '../validators/recentlyTrackValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import recentlyTrackController from '../controllers/recentlyTrackController'


router.post(
  '/add',
        recentlyTrackValidator.checkCreateTrackRecently(),
        expressValidatorMiddleware.handleValidationError,
        recentlyTrackController.createRecently
)

router.delete(
  '/delete',
        recentlyTrackValidator.checkDeleteTrackRecently(),
        expressValidatorMiddleware.handleValidationError,
        recentlyTrackController.deleteRecently
)

export default router
