import { body, header } from 'express-validator'

class FavoriteValidator {
  checkGetFavorite() {
    return [
      body('userId')
        .notEmpty(),
      header('Authorization')
    ]
  }

}

export default new FavoriteValidator()
