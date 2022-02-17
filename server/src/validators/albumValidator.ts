import { body, header } from 'express-validator'

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
}

export default new AlbumValidator()
