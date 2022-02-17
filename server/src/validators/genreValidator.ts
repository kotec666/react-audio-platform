import { body, header } from 'express-validator'

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
      body('genreId')
        .notEmpty(),
      header('Authorization')
    ]
  }

}

export default new GenreValidator()
