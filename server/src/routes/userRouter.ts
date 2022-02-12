import express from 'express'
const router = express.Router()
import UserValidator from './../validators/userValidator'
import userController from '../controllers/userController'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import authMiddleware from '../middleware/authMiddleware'

router.post(
  '/registration',
        UserValidator.checkCreateUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.registration
)
router.post(
       '/login',
        UserValidator.checkLoginUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.login
)
router.post(
  '/logout',
        UserValidator.checkLogoutUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.logout
)
router.get(
  '/activate/:link',
        UserValidator.checkActivateUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.activate
)
router.get(
  '/refresh',
        UserValidator.checkRefreshUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.refresh
)
router.get(
  '/getAll',
        // authMiddleware.auth,
        checkRoleMiddleware.checkRole(['ADMIN', 'SINGER']),
        userController.getUsers
)


export default router
