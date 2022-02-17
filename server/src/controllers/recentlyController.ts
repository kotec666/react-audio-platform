import { NextFunction, Request, Response } from 'express'
import recentlyService from '../service/recentlyService'
import { Recently, RecentlyTrack, Track } from '../models/models'
import { IncludeThroughOptions } from 'sequelize'


class RecentlyController {

  async getOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {userId} = req.body
      const recently = await Recently.findOne(
        {
          where: {userId: userId},
          include: [
            {model: Track, through: RecentlyTrack} as IncludeThroughOptions,
          ]
        },
      )

      return res.json({ recently })
    } catch (e) {
      next(e)
    }
  }

}

export default new RecentlyController()
