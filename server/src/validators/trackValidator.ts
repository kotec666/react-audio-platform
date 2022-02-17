import { body, header, query } from 'express-validator'

class TrackValidator {
  checkCreateTrack() {
    return [
      body('trackInfo')
        .notEmpty(),
      body('userId')
        .notEmpty(),
      body('genreId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkDeleteTrack() {
    return [
      body('trackId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkGetByUserIdTrack() {
    return [
      body('userId')
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

}

export default new TrackValidator()
