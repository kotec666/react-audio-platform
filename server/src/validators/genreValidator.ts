import { body, header, param, query } from 'express-validator'

class GenreValidator {
  checkCreateGenre() {
    return [
      body('name')
        .notEmpty(),
      body('code')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkDeleteGenre() {
    return [
      param('genreId')
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

  checkGetByCode() {
    return [
      query('code')
        .notEmpty(),
    ]
  }

}

export default new GenreValidator()
