import express from 'express'
const router = express.Router()
import UserValidator from './../validators/userValidator'
import userController from '../controllers/userController'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware'
import expressValidatorMiddleware from '../middleware/expressValidatorMiddleware'
import authMiddleware from '../middleware/authMiddleware'
import passport from 'passport'
import ApiError from '../error/ApiError'

router.get(
  '/login/success', (req, res) => {
    if (req.user) {
      res.status(200).json({
        refreshToken: req.cookies.refreshToken,
        accessToken: req.cookies.accessToken,
        user: req.user,
      })
    }
  }
)

router.get(
      '/login/failed', (req, res) => {
           throw ApiError.unauthorizedError()
    }
)

router.get(
          '/google',
                passport.authenticate('google',
        { scope: ['email', 'profile']
}))

router.get(
  '/auth/google/callback',
        passport.authenticate('google', {
        successRedirect: `${process.env.CLIENT_URL}`,
        failureRedirect: `/login/failed`
  })
)

router.get(
        '/github',
              passport.authenticate('github', { scope: ['email', 'profile']
}))

router.get(
  '/auth/github/callback',
        passport.authenticate('github', {
        successRedirect: `${process.env.CLIENT_URL}`,
        failureRedirect: `/login/failed`
  })
)

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
        checkRoleMiddleware.checkRole(['ADMIN']),
        userController.getUsers
)

router.get(
  '/getAllByPage',
        UserValidator.checkGetByPage(),
        expressValidatorMiddleware.handleValidationError,
        userController.getAllByPage
)


router.get(
  '/getSingerDataById',
        UserValidator.checkGetByDataById(),
        expressValidatorMiddleware.handleValidationError,
        userController.getSingerDataBySingerId
)


export default router
