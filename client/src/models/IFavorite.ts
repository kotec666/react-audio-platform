export interface ITableFavoriteTrack {
    id: number
    createdAt: string
    updatedAt: string
    favoriteId: number
    trackId: number
}

export interface IUserFavoriteTracks {
    id: number
    name: string
    streams: number
    trackAudio: string
    createdAt: string
    updatedAt: string
    userId: number
    genreId: number
    albumId: number | null
    favorite_track: ITableFavoriteTrack

}

export interface IFavoriteData {
    id: number
    createdAt: string
    updatedAt: string
    userId: number
    userTracksFavorite: IUserFavoriteTracks[]
}

export interface IFavoriteRows {
    count: number
    rows: IFavoriteData[]
}

export interface IFavorite {
    favorite: IFavoriteRows
}

export interface IFavoriteId {
    id: number
    createdAt: string
    updatedAt: string
    userId: number
}
