import { NextFunction, Request, Response } from 'express'
import trackService from '../service/trackService'

class TrackController {

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { trackInfo, userId, genreId } = req.body
      const files = req.files

      const track = await trackService.addTrack(trackInfo, files, +userId, +genreId)
      return res.json(track)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { trackId } = req.body
      const { user } = req
      if (!user) {
        return res.json('Пользователя нет')
      } else {
        // @ts-ignore
        const userId = user.id
        const track = await trackService.deleteTrack(+trackId, +userId)
        return res.json(track)
      }

    } catch (e) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const track = await trackService.getAllTrack()
      return res.json(track)
    } catch (e) {
      next(e)
    }
  }

  async getAllByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body
      const track = await trackService.getAllTrackByUserId(+userId)
      return res.json(track)
    } catch (e) {
      next(e)
    }
  }


  async getAllByPage(req: Request, res: Response, next: NextFunction) {
    try {
      let { _limit, page, search } = req.query
      if (!_limit || !page) {
        return res.json('empty params')
      } else {
        if (search) {
          const track = await trackService.getBySearchWord(+_limit, +page, search as string)
          return res.json(track)
        } else {
          return res.json('tracks not found')
        }
      }
    } catch (e) {
      next(e)
    }
  }


}

export default new TrackController()
