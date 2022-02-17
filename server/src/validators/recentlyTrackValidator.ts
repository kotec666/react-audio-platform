import { body, header } from 'express-validator'

class RecentlyTrackValidator {
  checkDeleteTrackRecently() {
    return [
      body('recentlyId')
        .notEmpty(),
      body('trackId')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkCreateTrackRecently() {
    return [
      body('recentlyId')
        .notEmpty(),
      body('trackId')
        .notEmpty(),
      header('Authorization')
    ]
  }

}

export default new RecentlyTrackValidator()
