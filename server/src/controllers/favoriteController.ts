import { NextFunction, Request, Response } from 'express'
import { Favorite, FavoriteTrack, Track } from '../models/models'
import { IncludeThroughOptions, Op } from 'sequelize'


class FavoriteController {

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query
      let _userId: number

      if (!userId) {
        return res.json('invalid params')
      }
      if (typeof userId === 'string') {
        _userId = parseInt(userId)
        const favorite = await Favorite.findOne(
          {
            where: { userId: _userId },
            include: [
              { model: Track, through: FavoriteTrack } as IncludeThroughOptions
            ]
          }
        )

        return res.json({ favorite })
      }
    } catch (e) {
      next(e)
    }
  }

  async getAllByPage(req: Request, res: Response, next: NextFunction) {
    try {
      let { _limit, page, search, userId } = req.query
      let offset: number
      let _userId: number

      if (!_limit || !page || !userId) {
        return res.json('empty params')
      } else {
        if (search) {
          if (typeof userId === 'string') {
            _userId = parseInt(userId)
            if (typeof page === 'string' && typeof _limit === 'string') {
              offset = parseInt(page) * parseInt(_limit) - parseInt(_limit)
              const favorite = await Favorite.findAndCountAll({
                where: { userId: _userId },
                include: [{ model: Track, as: 'userTracksFavorite', where: { name: { [Op.like]: `%${search}%` } } }],
                offset: +offset,
                limit: +_limit
              })
              return res.json({ favorite: favorite })
            }
          }
        } else {
          if (typeof userId === 'string') {
            _userId = parseInt(userId)
            if (typeof page === 'string' && typeof _limit === 'string') {
              offset = parseInt(page) * parseInt(_limit) - parseInt(_limit)
              const favorite = await Favorite.findAndCountAll({
                where: { userId: _userId },
                include: [{ model: Track, as: 'userTracksFavorite' }], offset: +offset, limit: +_limit
              })
              return res.json({ favorite: favorite })
            }
          }
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async getFavoriteIdByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { _userId } = req.query
      let userId: number

      if (!_userId) {
        return res.json('invalid params')
      } else {
        if (typeof _userId === 'string') {
          userId = parseInt(_userId)
          const favoriteId = await Favorite.findOne({ where: { userId: userId } })
          return res.json(favoriteId)
        }
      }
    } catch (e) {
      next(e)
    }
  }

}

export default new FavoriteController()
