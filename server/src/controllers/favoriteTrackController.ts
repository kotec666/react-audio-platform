import { NextFunction, Request, Response } from 'express'
import favoriteTrackService from '../service/favoriteTrackService'
import { FavoriteTrack } from '../models/models'


class FavoriteTrackController {

  async getFavoriteByFavoriteId(req: Request, res: Response, next: NextFunction) {
    try {
      const { _favoriteId } = req.query
      if (!_favoriteId) {
        return res.json('invalid params')
      }
      const favoriteTrack = await FavoriteTrack.findAll({ where: { favoriteId: +_favoriteId } })

      return res.json({ favoriteTrack })
    } catch (e) {
      next(e)
    }
  }

  async createFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const { trackId, favoriteId } = req.body
      const favorite = favoriteTrackService.create(+trackId, +favoriteId)

      return res.json(favorite)
    } catch (e) {
      next(e)
    }
  }


  async deleteFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const { trackId, favoriteId } = req.body
      const favorite = favoriteTrackService.deleteOne(+trackId, +favoriteId)

      return res.json(favorite)
    } catch (e) {
      next(e)
    }
  }

}

export default new FavoriteTrackController()
