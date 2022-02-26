import { RecentlyTrack } from '../models/models'
import ApiError from '../error/ApiError'


class RecentlyTrackService {

  async create(trackId: number, recentlyId: number) {
    const candidate = await RecentlyTrack.findOne({
      where: {
       trackId: trackId,
       recentlyId: recentlyId
      }
    })
    if (candidate) {
      throw ApiError.badRequest(`Недавний трек уже существует, недавний трек должен быть уникален`)
    }
    const recentlyTrack = await RecentlyTrack.create({ trackId, recentlyId })

    return { recentlyTrack: recentlyTrack }
  }

  async deleteOne(trackId: number, recentlyId: number) {
    const recentlyTrack = await RecentlyTrack.findAll({
      where: {
        trackId,
        recentlyId
      }
    })

    const recently = recentlyTrack[0]
    await recently.destroy()
    return recently
  }

}

export default new RecentlyTrackService()
