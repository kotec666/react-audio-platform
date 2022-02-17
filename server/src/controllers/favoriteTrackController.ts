import { NextFunction, Request, Response } from 'express'
import favoriteTrackService from '../service/favoriteTrackService'


class FavoriteTrackController {

  async createFavorite(req:Request, res:Response, next:NextFunction) {
    try {
      const {trackId, favoriteId} = req.body
      const favorite = favoriteTrackService.create(+trackId, +favoriteId)

      return res.json(favorite)
    } catch (e) {
      next(e)
    }
  }


  async deleteFavorite(req:Request, res:Response, next:NextFunction) {
    try {
      const {trackId, favoriteId} = req.body
      const favorite = favoriteTrackService.deleteOne(+trackId, +favoriteId)

      return res.json(favorite)
    } catch (e) {
      next(e)
    }
  }

}

export default new FavoriteTrackController()
