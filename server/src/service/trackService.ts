import { Track } from '../models/models'
import ApiError from '../error/ApiError'
import * as uuid from 'uuid'
import path from 'path'
import { Op } from 'sequelize'


class TrackService {

  async addTrack(trackInfo: any, files: any, userId: number, genreId: number) {

    const generateName = () => {
      return uuid.v4() + '.mp3'
    }

    const uploadFiles = async (fileName: string) => {
      if (files.trackAudio) {
        for (const j of files.trackAudio) {
          await j.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
      }
    }


    let tracks = JSON.parse(trackInfo)
    for (const i of tracks) {

      let fileName = generateName()

      await Track.create({
        name: i.name,
        streams: 0,
        trackAudio: fileName,
        albumId: null,
        userId: userId,
        genreId: genreId
      })

      await uploadFiles(fileName)

    }

    return { status: 201 }
  }

  async deleteTrack(trackId: number, user: any) {
    const track = await Track.findOne({ where: { id: trackId, userId: user.id } })
    if (!track) {
      throw ApiError.badRequest(`Трека с id: ${trackId} не существует, или трек вам не принадлежит`)
    }
    if (user.role === 'ADMIN' || track.userId === user.id) {
      await track.destroy()
      return { status: 204 }
    } else {
      return { status: 404 }
    }
  }

  async getAllTrack() {
    const track = await Track.findAll()
    return track
  }

  async getAllTrackByUserId(userId: number) {
    const track = await Track.findAll({ where: { userId: userId } })
    return track
  }

  async getBySearchWord(_limit: number, page: number, search: string) {
    try {
      let offset = page * _limit - _limit
      const track = await Track.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${search}%`
          }
        },
        offset: +offset, limit: +_limit
      })
      return { track: track }
    } catch (e) {
      console.log(e)
    }
  }


}

export default new TrackService()
