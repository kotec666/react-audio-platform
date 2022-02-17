import { NextFunction, Request, Response } from 'express'
import recentlyTrackService from '../service/recentlyTrackService'


class RecentlyTrackController {

  async createRecently(req: Request, res: Response, next: NextFunction) {
    try {
      const { trackId, recentlyId } = req.body
      const recently = recentlyTrackService.create(+trackId, +recentlyId)

      return res.json(recently)
    } catch (e) {
      next(e)
    }
  }


  async deleteRecently(req: Request, res: Response, next: NextFunction) {
    try {
      const { trackId, recentlyId } = req.body
      const recently = recentlyTrackService.deleteOne(+trackId, +recentlyId)

      return res.json(recently)
    } catch (e) {
      next(e)
    }
  }

}

export default new RecentlyTrackController()
