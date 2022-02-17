import { NextFunction, Request, Response } from 'express'
import genreService from '../service/genreService'

class GenreController {

  async addOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {name, code} = req.body

      const genre = await genreService.addGenre(name, code)
      return res.json(genre)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req:Request, res:Response, next:NextFunction) {
    try {
      const {genreId} = req.body //? req.params
      const genre = await genreService.deleteGenre(+genreId)
      return res.json(genre)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req:Request, res:Response, next:NextFunction) {
    try {
      const genre = await genreService.getAllGenre()
      return res.json(genre)
    } catch (e) {
      next(e)
    }
  }

}

export default new GenreController()
