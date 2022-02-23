export interface IGenreTracks {
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

export interface IGenreData {
    id: number
    name: string
    code: string
    createdAt: string
    updatedAt: string
    genreTracks: IGenreTracks[]
}

export interface IGenreRows {
    count: number
    rows: IGenreData[]
}

export interface IGenre {
    genre: IGenreRows
}


export interface IAllGenre {
    id: number
    name: string
    code: string
    createdAt: string
    updatedAt: string
}
