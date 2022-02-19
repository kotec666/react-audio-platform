import { NextFunction, Request, Response } from 'express'
import { Favorite, FavoriteTrack, Track } from '../models/models'
import { IncludeThroughOptions, Op } from 'sequelize'


class FavoriteController {

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body
      const favorite = await Favorite.findOne(
        {
          where: { userId: userId },
          include: [
            { model: Track, through: FavoriteTrack } as IncludeThroughOptions
          ]
        }
      )

      return res.json({ favorite })
    } catch (e) {
      next(e)
    }
  }

  async getAllByPage(req: Request, res: Response, next: NextFunction) {
    try {
      let { _limit, page, search } = req.query
      const { userId } = req.body

      let offset:number

      if (!_limit || !page) {
        return res.json('empty params')
      } else {
        if (search) {
          if (typeof page === 'string' && typeof _limit === 'string') {
              offset = parseInt(page) * parseInt(_limit) - parseInt(_limit)
              const favorite = await Favorite.findAndCountAll({
                where: { userId: userId },
                include: [{ model: Track, as: 'userTracksFavorite', where: { name: { [Op.like]: `%${search}%` } } }],
                offset: +offset,
                limit: +_limit
              })
              return res.json({ favorite: favorite })
          }
        } else {
          if (typeof page === 'string' && typeof _limit === 'string') {
            offset = parseInt(page) * parseInt(_limit) - parseInt(_limit)
            const favorite = await Favorite.findAndCountAll({
              where: { userId: userId },
              include: [{ model: Track, as: 'userTracksFavorite' }], offset: +offset, limit: +_limit
            })
            return res.json({ favorite: favorite })
          }
        }
      }
    } catch (e) {
      next(e)
    }
  }

}

export default new FavoriteController()
