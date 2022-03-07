import { body, cookie, param, query } from 'express-validator'

class UserValidator {
  checkCreateUser() {
    return [
      body('login')
        .notEmpty()
        .isLength({min: 3, max: 26}),
      body('email')
        .notEmpty()
        .isEmail()
        .isLength({min: 5, max: 55}),
      body('password')
        .notEmpty()
        .isLength({min: 5, max: 26})
    ]
  }

  checkLoginUser() {
    return [
      body('login')
        .notEmpty()
        .isLength({min: 3, max: 26}),
      body('password')
        .notEmpty()
        .isLength({min: 5, max: 26})
    ]
  }

  checkLogoutUser() {
    return [
      cookie('refreshToken')
        .notEmpty()
    ]
  }


  checkActivateUser() {
    return [
      param('link')
        .notEmpty()
    ]
  }

  checkRefreshUser() {
    return [
      cookie('refreshToken')
        .notEmpty()
    ]
  }

  checkGetByPage() {
    return [
      query('_limit')
        .notEmpty(),
      query('page')
        .notEmpty(),
      query('search')
        .optional()
    ]
  }

  checkGetByDataById() {
    return [
      param('userId')
        .notEmpty(),
    ]
  }

  checkGetByUserDataById() {
    return [
      param('userId')
        .notEmpty(),
    ]
  }

}

export default new UserValidator()
