import express from 'express'
const router = express.Router()
import UserValidator from './../validators/userValidator'
import userController from '../controllers/userController'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'

router.post(
  '/registration',
        UserValidator.checkCreateUser(),
        expressValidatorMiddleware.handleValidationError,
        userController.registration
)
router.post(
       '/login',
        userController.login
)
router.post(
  '/logout',
        userController.logout
)
router.get(
  '/activate/:link',
        userController.activate
)
router.get(
  '/refresh',
        userController.refresh
)
router.get(
  '/getAll',
        checkRoleMiddleware.checkRole('ADMIN'),
        userController.getUsers
)


export default router
