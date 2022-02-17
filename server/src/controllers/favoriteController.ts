import { NextFunction, Request, Response } from 'express'
import { Favorite, FavoriteTrack, Track } from '../models/models'
import { IncludeThroughOptions } from 'sequelize'


class FavoriteController {

  async getOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {userId} = req.body
      const favorite = await Favorite.findOne(
        {
          where: {userId: userId},
          include: [
            {model: Track, through: FavoriteTrack} as IncludeThroughOptions,
          ]
        },
      )

      return res.json({ favorite })
    } catch (e) {
      next(e)
    }
  }

}

export default new FavoriteController()
