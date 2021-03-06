import { Genre, Track } from '../models/models'
import ApiError from '../error/ApiError'
import { Op } from 'sequelize'


class GenreService {

  async addGenre(name: string, code: string) {
    const candidate = await Genre.findOne({ where: { name: name, code: code } })
    if (candidate) {
      return ApiError.badRequest('жанр уже существует')
    }

    const genre = await Genre.create({ name, code })
    return { genre: genre }
  }

  async deleteGenre(genreId: number) {
    const genre = await Genre.findOne({ where: { id: genreId } })
    if (!genre) {
      throw ApiError.badRequest(`Жанра с id: ${genreId} не существует`)
    }
    await genre.destroy()
    return { status: 204 }
  }

  async getAllGenre() {
    const genre = await Genre.findAll({ order: [['id', 'DESC']] })
    return genre
  }

  async getAllPerPage(_limit: number, page: number) {
    try {
      let offset = page * _limit - _limit
      const genre = await Genre.findAndCountAll({
        include: [{ model: Track, as: 'genreTracks' }], offset: +offset, limit: +_limit
      })
      return { genre: genre }
    } catch (e) {
      console.log(e)
    }
  }

  async getAllPerPageAndSearchWord(_limit: number, page: number, search: string) {
    try {
      let offset = page * _limit - _limit
      const genre = await Genre.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${search}%`
          }
        },
        include: [{ model: Track, as: 'genreTracks' }], offset: +offset, limit: +_limit
      })

      return { genre: genre }
    } catch (e) {
      console.log(e)
    }
  }

  async getTracksByCodePage(_limit: number, page: number, code: string) {
    try {
      let offset = page * _limit - _limit
      console.log(page, _limit, code)
      const genre = await Genre.findAndCountAll({
        where: { code: code },
        include: [{ model: Track, as: 'genreTracks' }], offset: +offset, limit: +_limit
      })
      return { genre: genre }
    } catch (e) {
      console.log(e)
    }
  }

  async getTracksByCodePageAndSearch(_limit: number, page: number, search: string, code: string) {
    try {
      let offset = page * _limit - _limit
      const track = await Genre.findAndCountAll({
        where: { code: code },
        include: [{
          model: Track, as: 'genreTracks',
          where: {
            name: {
              [Op.like]: `%${search}%`
            }
          }
        }], offset: +offset, limit: +_limit
      })
      return { genre: track }
    } catch
      (e) {
      console.log(e)
    }
  }

}

export default new GenreService()
