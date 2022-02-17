import express from 'express'
const router = express.Router()

import favoriteTrackValidator from '../validators/favoriteTrackValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import favoriteTrackController from '../controllers/favoriteTrackController'


router.post(
  '/add',
        favoriteTrackValidator.checkCreateTrackFavorite(),
        expressValidatorMiddleware.handleValidationError,
        favoriteTrackController.createFavorite
)

router.delete(
  '/delete',
        favoriteTrackValidator.checkDeleteTrackFavorite(),
        expressValidatorMiddleware.handleValidationError,
        favoriteTrackController.deleteFavorite
)


export default router
