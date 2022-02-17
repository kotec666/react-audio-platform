import express from 'express'
const router = express.Router()

import AlbumValidator from '../validators/albumValidator'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import albumController from '../controllers/albumController'

router.post(
  '/add',
        checkRoleMiddleware.checkRole(['ADMIN', 'SINGER']),
        AlbumValidator.checkCreateAlbum(),
        expressValidatorMiddleware.handleValidationError,
        albumController.addOne
)

router.delete(
  '/delete',
        checkRoleMiddleware.checkRole(['ADMIN', 'SINGER']),
        AlbumValidator.checkDeleteAlbum(),
        expressValidatorMiddleware.handleValidationError,
        albumController.deleteOne
)


router.get(
  '/getAll',
       albumController.getAll
)

router.get(
  '/getAllByUser',
       AlbumValidator.checkGetByUser(),
       expressValidatorMiddleware.handleValidationError,
       albumController.getAllByUser
)


export default router
