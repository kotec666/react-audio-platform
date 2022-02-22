import { ITrackData } from './ITrack'
import { IAlbumData } from './IAlbum'

export interface ISingerData {
    id: number
    pseudonym: string
}

export interface ISingerRows {
    count: number
    rows: ISingerData[]
}

export interface ISinger {
    singer: ISingerRows
}

export interface ISingerRowsDetailed {
    id: number
    login:string
    email:string
    role: string
    pseudonym:string
    userTracks: ITrackData[]
    userAlbums: IAlbumData[]
}

export interface ISingerDetailed {
    singer: ISingerRowsDetailed[]
}
