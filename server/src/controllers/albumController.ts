import { NextFunction, Request, Response } from 'express'
import albumService from '../service/albumService'

class AlbumController {

  async addOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {name, userId, genreId, albumTracks} = req.body
      const files = req.files

      if(!files) {
        return res.status(204).json('Загрузите треки плиз')
      }

      const album = await albumService.addAlbum(name, +userId, +genreId, albumTracks, files)
      return res.json(album)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {albumId} = req.body //? req.params
      const album = await albumService.deleteAlbum(+albumId)
      return res.json(album)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req:Request, res:Response, next:NextFunction) {
    try {
      const album = await albumService.getAllAlbum()
      return res.json(album)
    } catch (e) {
      next(e)
    }
  }

  async getAllByUser(req:Request, res:Response, next:NextFunction) {
    try {
      const {userId} = req.body
      const album = await albumService.getAllAlbumByUserId(+userId)
      return res.json(album)
    } catch (e) {
      next(e)
    }
  }

}

export default new AlbumController()
