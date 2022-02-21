import { FavoriteTrack } from '../models/models'


class FavoriteTrackService {


  async create(trackId: number, favoriteId: number) {
    const favoriteTrack = await FavoriteTrack.create({ trackId, favoriteId })
    return { favoriteTrack: favoriteTrack }
  }

  async deleteOne(trackId: number, favoriteId: number) {
    const favoriteTracks = await FavoriteTrack.findAll({
      where: {
        trackId,
        favoriteId
      }
    })

    const favorite = favoriteTracks[0]
    await favorite.destroy()
    return favorite
  }

}

export default new FavoriteTrackService()
