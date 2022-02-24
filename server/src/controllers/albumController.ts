import { NextFunction, Request, Response } from 'express'
import albumService from '../service/albumService'

class AlbumController {

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, userId, genreId, albumTracks } = req.body
      const files = req.files

      if (!files) {
        return res.status(204).json('Загрузите треки плиз')
      }

      const album = await albumService.addAlbum(name, +userId, +genreId, albumTracks, files)
      return res.json(album)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { albumId } = req.body
      const { user } = req
      if (!user) {
        return res.json('Пользователя нет')
      } else {
        const album = await albumService.deleteAlbum(+albumId, user)
        return res.json(album)
      }
    } catch (e) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const album = await albumService.getAllAlbum()
      return res.json(album)
    } catch (e) {
      next(e)
    }
  }

  async getAllByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body
      const album = await albumService.getAllAlbumByUserId(+userId)
      return res.json(album)
    } catch (e) {
      next(e)
    }
  }

  async getAllByPage(req: Request, res: Response, next: NextFunction) {
    try {
      let { _limit, page, search } = req.query
      if (!_limit || !page) {
        return res.json('empty params')
      } else {
        if (search) {
          const album = await albumService.getAllPerPageAndSearchWord(+_limit, +page, search as string)
          return res.json(album)
        } else {
          const album = await albumService.getAllPerPage(+_limit, +page)
          return res.json(album)
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async getTracks(req: Request, res: Response, next: NextFunction) {
    try {
      let { _limit, page, search, albumId } = req.query

      if (!_limit || !page || !albumId) {
        return res.json('empty params')
      } else {
        if (search) {
          const tracks = await albumService.getTracksByAlbumIdAndSearch(+_limit, +page, +albumId, search as string)
          return res.json(tracks)
        } else {
          const tracks = await albumService.getTracksByAlbumId(+_limit, +page, +albumId)
          return res.json(tracks)
        }
      }
    } catch (e) {
      next(e)
    }
  }

}

export default new AlbumController()
