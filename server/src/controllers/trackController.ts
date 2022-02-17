import { NextFunction, Request, Response } from 'express'
import trackService from '../service/trackService'

class TrackController {

  async addOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {trackInfo, userId, genreId} = req.body
      const files = req.files

      const track = await trackService.addTrack(trackInfo, files, +userId, +genreId)
      return res.json(track)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {trackId} = req.body
      const track = await trackService.deleteTrack(+trackId)
      return res.json(track)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req:Request, res:Response, next:NextFunction) {
    try {
      const track = await trackService.getAllTrack()
      return res.json(track)
    } catch (e) {
      next(e)
    }
  }

  async getAllByUser(req:Request, res:Response, next:NextFunction) {
    try {
      const {userId} = req.body
      const track = await trackService.getAllTrackByUserId(+userId)
      return res.json(track)
    } catch (e) {
      next(e)
    }
  }



}

export default new TrackController()
