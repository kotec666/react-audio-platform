import { body, header } from 'express-validator'

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

}

export default new TrackValidator()
