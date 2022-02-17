import express from 'express'
const router = express.Router()

import recentlyValidator from '../validators/recentlyValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import recentlyController from '../controllers/recentlyController'

router.get(
  '/getAll',
        recentlyValidator.checkGetRecently(),
        expressValidatorMiddleware.handleValidationError,
        // authMiddleware.auth,
        recentlyController.getOne
)


export default router
