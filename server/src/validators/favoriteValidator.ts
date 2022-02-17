import { body, header, query } from 'express-validator'

class FavoriteValidator {
  checkGetFavorite() {
    return [
      body('userId')
        .notEmpty(),
      header('Authorization')
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

}

export default new FavoriteValidator()
