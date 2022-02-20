export interface ITrackData {
    id: number
    name: string
    streams: number
    trackAudio: string
    createdAt: string
    updatedAt: string
    userId: number
    genreId: number
    albumId: number | null
}

export interface ITrackRows {
    count: number
    rows: ITrackData[]
}

export interface ITrack {
    track: ITrackRows
}
