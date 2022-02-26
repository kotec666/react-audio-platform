export interface ITableRecentlyTrack {
    id: number
    createdAt: string
    updatedAt: string
    recentlyId: number
    trackId: number
}

export interface IUserRecentlyTracks {
    id: number
    name: string
    streams: number
    trackAudio: string
    createdAt: string
    updatedAt: string
    userId: number
    genreId: number
    albumId: number | null
    recently_track: ITableRecentlyTrack

}

export interface IRecentlyData {
    id: number
    createdAt: string
    updatedAt: string
    userId: number
    userTracksRecently: IUserRecentlyTracks[]
}

export interface IRecentlyRows {
    count: number
    rows: IRecentlyData[]
}

export interface IRecently {
    recently: IRecentlyRows
}

export interface IRecentlyId {
    id: number
    createdAt: string
    updatedAt: string
    userId: number
}
