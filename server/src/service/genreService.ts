import { Genre } from '../models/models'
import ApiError from '../error/ApiError'


class GenreService {

  async addGenre(name: string, code: string) {
    const candidate = await Genre.findOne( { where: { name: name, code: code }})
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
    const genre = await Genre.findAll()
    return genre
  }
}

export default new GenreService()
