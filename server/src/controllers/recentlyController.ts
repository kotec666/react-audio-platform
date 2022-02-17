import { NextFunction, Request, Response } from 'express'
import { Recently, RecentlyTrack, Track } from '../models/models'
import { IncludeThroughOptions, Op } from 'sequelize'


class RecentlyController {

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body
      const recently = await Recently.findOne(
        {
          where: { userId: userId },
          include: [
            { model: Track, through: RecentlyTrack } as IncludeThroughOptions
          ]
        }
      )

      return res.json({ recently })
    } catch (e) {
      next(e)
    }
  }

  async getAllByPage(req: Request, res: Response, next: NextFunction) {
    try {
      let { _limit, page, search } = req.query
      const { userId } = req.body

      // @ts-ignore
      let offset = page * _limit - _limit

      if (!_limit || !page) {
        return res.json('empty params')
      } else {
        if (search) {
          const recently = await Recently.findAndCountAll({
            where: { userId: userId },
            include: [{ model: Track, as: 'userTracksRecently', where: { name: { [Op.like]: `%${search}%` } } }],
            offset: +offset,
            limit: +_limit
          })
          return res.json({ recently: recently })
        } else {
          const recently = await Recently.findAndCountAll({
            where: { userId: userId },
            include: [{ model: Track, as: 'userTracksRecently' }], offset: +offset, limit: +_limit
          })
          return res.json({ recently: recently })
        }
      }
    } catch (e) {
      next(e)
    }
  }

}

export default new RecentlyController()
