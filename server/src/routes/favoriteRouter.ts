import express from 'express'
const router = express.Router()

import favoriteValidator from '../validators/favoriteValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import favoriteController from '../controllers/favoriteController'

router.get(
  '/getAll',
        favoriteValidator.checkGetFavorite(),
        expressValidatorMiddleware.handleValidationError,
        // authMiddleware.auth,
        favoriteController.getOne
)


router.get(
  '/getAllByPage',
        favoriteValidator.checkGetByPage(),
        expressValidatorMiddleware.handleValidationError,
        favoriteController.getAllByPage
)

router.get(
  '/getFavoriteIdByUserId',
        favoriteController.getFavoriteIdByUserId
)


export default router
