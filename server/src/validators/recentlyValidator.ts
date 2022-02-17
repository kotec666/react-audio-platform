import { body, header } from 'express-validator'

class RecentlyValidator {
  checkGetRecently() {
    return [
      body('userId')
        .notEmpty(),
      header('Authorization')
    ]
  }

}

export default new RecentlyValidator()
