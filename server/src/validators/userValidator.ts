import { body } from 'express-validator'

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



}

export default new UserValidator()
