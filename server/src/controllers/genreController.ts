import { NextFunction, Request, Response } from 'express'
import genreService from '../service/genreService'

class GenreController {

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body

      const genre = await genreService.addGenre(name, code)
      return res.json(genre)
    } catch (e) {
      next(e)
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { genreId } = req.params
      const genre = await genreService.deleteGenre(+genreId)
      return res.json(genre)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const genre = await genreService.getAllGenre()
      return res.json(genre)
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
          const genre = await genreService.getAllPerPageAndSearchWord(+_limit, +page, search as string)
          return res.json(genre)
        } else {
          const genre = await genreService.getAllPerPage(+_limit, +page)
          return res.json(genre)
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async getTracks(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params
      const tracks = await genreService.getTracksByCode(code)
      return res.json(tracks)
    } catch (e) {
      next(e)
    }
  }

}

export default new GenreController()
