import { Album, Track } from '../models/models'
import { TrackInstance } from '../models/interfaces'
import ApiError from '../error/ApiError'
import path from 'path'
import * as uuid from 'uuid'
import { FileArray, UploadedFile } from 'express-fileupload'

interface IFiles extends UploadedFile {
  trackAudio: Array<TrackInstance>
}

class AlbumService {

  async addAlbum(name: string, userId: number, genreId: number, albumTracks: Array<TrackInstance>, files: IFiles | FileArray) {
    const album = await Album.create({ name, userId })


    const generateName = () => {
      return uuid.v4() + '.mp3'
    }


    const uploadFiles = async (fileName: string) => {

      if (files.trackAudio) {
      // @ts-ignore
        for (const j of files.trackAudio) {
          await j.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
      }
    }



     // @ts-ignore
    let albumInfo = JSON.parse(albumTracks)
      for (const i of albumInfo) {

        let fileName = generateName()

        await Track.create({
          name: i.name,
          streams: 0,
          trackAudio: fileName,
          albumId: album.id,
          userId: userId,
          genreId: genreId
        })

       await uploadFiles(fileName)

      }

    return { album: album }
  }

  async deleteAlbum(albumId: number) {
    const album = await Album.findOne({ where: { id: albumId } })
    if (!album) {
      throw ApiError.badRequest(`Альбома с id: ${albumId} не существует`)
    }
    await album.destroy()
    return { status: 204 }
  }

  async getAllAlbum() {
    const album = await Album.findAll({
      include: [{model: Track, as: 'albumTracks'}]
    })
    return album
  }

  async getAllAlbumByUserId(userId:number) {
    const album = await Album.findAll({
      where: { userId: userId },
      include: [{model: Track, as: 'albumTracks'}]
    })
    return album
  }

}

export default new AlbumService()
