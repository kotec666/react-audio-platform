import { body, header, query } from 'express-validator'

class AlbumValidator {
  checkCreateAlbum() {
    return [
      body('name')
        .notEmpty(),
      body('userId')
        .notEmpty(),
      body('albumTracks')
        .notEmpty(),
      header('Authorization')
    ]
  }

  checkDeleteAlbum() {
    return [
      body('albumId')
        .notEmpty(),
      header('Authorization')
    ]
  }


  checkGetByUser() {
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

  checkGetTracksByAlbumId() {
    return [
      body('albumId')
        .notEmpty(),
    ]
  }
}

export default new AlbumValidator()
