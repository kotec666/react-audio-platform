import {  header, query } from 'express-validator'

class FavoriteValidator {
  checkGetFavorite() {
    return [
      query('userId')
        .notEmpty(),
      header('Authorization')
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
        .optional(),
      query('userId')
        .notEmpty(),
      header('Authorization')
        .notEmpty()
    ]
  }

}

export default new FavoriteValidator()
