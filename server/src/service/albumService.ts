import { Album, Track } from '../models/models'
import ApiError from '../error/ApiError'
import path from 'path'
import * as uuid from 'uuid'
import { Op } from 'sequelize'

export interface ITrack {
  name: string
  genreId: number
  number: number
}

class AlbumService {

  async addAlbum(name: string, userId: number, albumTracks: any, files:any) {
    const album = await Album.create({ name, userId })

    const generateName = () => {
      return uuid.v4() + '.mp3'
    }


    let albumInfo = JSON.parse(albumTracks)


    if (albumInfo.length === 1) {
      let fileName = generateName()

      await Track.create({
        name: albumInfo[0].name,
        streams: 0,
        trackAudio: fileName,
        albumId: album.id,
        userId: userId,
        genreId: albumInfo[0].genreId
      })

      await files.trackAudio.mv(path.resolve(__dirname, '..', 'static', fileName))

      return { album: album }
    } else {
      albumInfo.forEach((track: ITrack, i: number) => {

        let fileName = generateName()

        Track.create({
          name: track.name,
          streams: 0,
          trackAudio: fileName,
          albumId: album.id,
          userId: userId,
          genreId: track.genreId
        })

        files.trackAudio[i].mv(path.resolve(__dirname, '..', 'static', fileName))

      })

      return { album: album }
    }


  }

  async deleteAlbum(albumId: number, user: any) {
    const album = await Album.findOne({ where: { id: albumId, userId: user.id } })
    if (!album) {
      throw ApiError.badRequest(`Альбома с id: ${albumId} не существует, или альбом вам не принадлежит`)
    }
    if (user.role === 'ADMIN' || album.userId === user.id) {
      await album.destroy()
      return { status: 204 }
    } else {
      return { status: 404 }
    }
  }

  async getAllAlbum() {
    const album = await Album.findAll({
      include: [{ model: Track, as: 'albumTracks' }]
    })
    return album
  }

  async getAllPerPage(_limit: number, page: number) {
    try {
      let offset = page * _limit - _limit
      const album = await Album.findAndCountAll({
        include: [{ model: Track, as: 'albumTracks' }], offset: +offset, limit: +_limit
      })
      return { album: album }
    } catch (e) {
      console.log(e)
    }
  }

  async getAllPerPageAndSearchWord(_limit: number, page: number, search: string) {
    try {
      let offset = page * _limit - _limit
      const album = await Album.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${search}%`
          }
        },
        include: [{ model: Track, as: 'albumTracks' }], offset: +offset, limit: +_limit
      })

      return { album: album }
    } catch (e) {
      console.log(e)
    }
  }

  async getAllAlbumByUserId(userId: number) {
    const album = await Album.findAll({
      where: { userId: userId },
      include: [{ model: Track, as: 'albumTracks' }]
    })
    return album
  }

  async getTracksByAlbumId(_limit: number, page: number, albumId: number) {
    try {
      let offset = page * _limit - _limit
      const tracks = await Album.findAndCountAll({
        include: [{ model: Track, as: 'albumTracks', where: {albumId: albumId } }], offset: +offset, limit: +_limit
      })
      return { album: tracks }
    } catch (e) {
      console.log(e)
    }
  }

  async getTracksByAlbumIdAndSearch(_limit: number, page: number, albumId: number, search: string) {
    try {
      let offset = page * _limit - _limit
      const track = await Album.findAndCountAll({
        include: [{ model: Track, as: 'albumTracks', where: { name: {[Op.like]: `%${search}%`}, albumId: albumId , } } ], offset: +offset, limit: +_limit
      })
      return {album: track}
    } catch
      (e) {
      console.log(e)
    }
  }

}

export default new AlbumService()
