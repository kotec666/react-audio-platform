import { body, header, query } from 'express-validator'

class FavoriteTrackValidator {
  checkDeleteTrackFavorite() {
    return [
      body('favoriteId')
        .notEmpty(),
      body('trackId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkCreateTrackFavorite() {
    return [
      body('favoriteId')
        .notEmpty(),
      body('trackId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkGetTrackFavorite() {
    return [
      body('favoriteId')
        .notEmpty(),
      header('Authorization')
    ]
  }

}

export default new FavoriteTrackValidator()
