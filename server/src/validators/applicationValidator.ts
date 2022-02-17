import { body, header } from 'express-validator'

class ApplicationValidator {
  checkCreateApplication() {
    return [
      body('userId')
        .notEmpty(),
      body('pseudonym')
        .notEmpty()
        .isLength({min: 3, max: 55}),
    ]
  }

  checkDeleteApplication() {
    return [
      body('userId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkAcceptOneApplication() {
    return [
      body('userId')
        .notEmpty()
        .isNumeric(),
      body('pseudonym')
        .notEmpty(),
      header('Authorization')
    ]
  }




}

export default new ApplicationValidator()
