import express from 'express'
const router = express.Router()

import GenreValidator from '../validators/genreValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import genreController from '../controllers/genreController'

router.post(
  '/add',
        checkRoleMiddleware.checkRole(['ADMIN']),
        GenreValidator.checkCreateGenre(),
        expressValidatorMiddleware.handleValidationError,
        genreController.addOne
)

router.delete(
  '/delete',
        checkRoleMiddleware.checkRole(['ADMIN']),
        GenreValidator.checkDeleteGenre(),
        expressValidatorMiddleware.handleValidationError,
        genreController.deleteOne
)


router.get(
  '/getAll',
        genreController.getAll
)

router.get(
  '/getAllByPage',
        GenreValidator.checkGetByPage(),
        expressValidatorMiddleware.handleValidationError,
        genreController.getAllByPage
)


router.get(
  '/getTracksByCode',
        GenreValidator.checkGetByCode(),
        expressValidatorMiddleware.handleValidationError,
        genreController.getTracks
)

export default router
