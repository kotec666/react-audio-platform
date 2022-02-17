import { RecentlyTrack } from '../models/models'


class RecentlyTrackService {

  async create(trackId: number, recentlyId: number) {
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
