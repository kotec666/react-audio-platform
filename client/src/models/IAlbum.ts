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


//запрос на сервер
export interface ILoginUserReq {
    login: string
    password: string
}


//ответ от сервера
export interface ILoginUserRes {
    accessToken: string
    refreshToken: string
}

//запрос на сервер
export interface IRegistrationUserReq {
    login: string
    password: string
    email: string
}


//ответ от сервера
export interface IRegistrationUserRes {
    accessToken: string
    refreshToken: string

}


//ответ от сервера
export interface IRefreshUserRes {
    accessToken: string
    refreshToken: string

}

//запрос на сервер
export interface IRefreshUserReq {
    accessToken: string
    refreshToken: string

}

//ответ от сервера
export interface ILogoutUserRes {
    number: number
}


