export interface favoriteTrackRows {
    id: number
    createdAt: string
    updatedAt: string
    favoriteId: number
    trackId: number
}
export interface IFavoriteTrack {
    favoriteTrack: favoriteTrackRows[]
}
