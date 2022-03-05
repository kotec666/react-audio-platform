import { NextFunction, Request, Response } from 'express'
import { Recently, RecentlyTrack, Track } from '../models/models'
import { IncludeThroughOptions, Op } from 'sequelize'


class RecentlyController {

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body
      if (typeof userId === 'string') {
        let _userId = parseInt(userId)
        const recently = await Recently.findOne(
          {
            where: { userId: _userId },
            include: [
              { model: Track, through: RecentlyTrack } as IncludeThroughOptions
            ]
          }
        )
        return res.json({ recently })
      }
    } catch (e) {
      next(e)
    }
  }

  async getAllByPage(req: Request, res: Response, next: NextFunction) {
    try {
      let { _limit, page, search, userId } = req.query


      let offset:number
      let parsedUserId:number

      if (!_limit || !page) {
        return res.json('empty params')
      } else {
        if (search) {
          if (typeof userId === 'string') {
            parsedUserId = parseInt(userId)
            if (typeof page === 'string' && typeof _limit === 'string') {
              offset = parseInt(page) * parseInt(_limit) - parseInt(_limit)
              const recently = await Recently.findAndCountAll({
                where: { userId: parsedUserId },
                include: [{ model: Track, as: 'userTracksRecently', where: { name: { [Op.like]: `%${search}%` } } }],
                offset: +offset,
                limit: +_limit
              })
              return res.json({ recently: recently })
            }
          }
        } else {
          if (typeof userId === 'string') {
            parsedUserId = parseInt(userId)
            if (typeof page === 'string' && typeof _limit === 'string') {
              offset = parseInt(page) * parseInt(_limit) - parseInt(_limit)
              const recently = await Recently.findAndCountAll({
                where: { userId: parsedUserId },
                include: [{ model: Track, as: 'userTracksRecently' }], offset: +offset, limit: +_limit
              })
              return res.json({ recently: recently })
            }
          }
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async getRecentlyIdByUserId (req: Request, res: Response, next: NextFunction) {
    const { _userId } = req.query
    if(!_userId) {
      return res.json('invalid params')
    } else {
      if (typeof _userId === 'string') {
        let userId = parseInt(_userId)
        const recentlyId = await Recently.findOne({ where: { userId: userId } })
        return res.json(recentlyId)
      }
    }
  }

}

export default new RecentlyController()
