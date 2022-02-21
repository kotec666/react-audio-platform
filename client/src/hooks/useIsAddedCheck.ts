import { favoriteTrackRows } from '../models/IFavoriteTrack'

export const isItemAdded = (items:favoriteTrackRows[], id:number) => {
   return items.some((obj) => Number(obj.trackId) === Number(id))
}
