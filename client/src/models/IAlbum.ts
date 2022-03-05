export interface IAlbumTracks {
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

export interface IAlbumData {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    userId: number
    albumTracks: IAlbumTracks[]
}

export interface IAlbumRows {
    count: number
    rows: IAlbumData[]
}

export interface IAlbum {
    album: IAlbumRows
}

