import { Model } from 'sequelize'

export interface TokenInstance extends Model {
  id: number
  refreshToken: string
}

export interface UserInstance extends Model {
  id: number
  login: string
  password: string
  email: string
  role: string
  pseudonym: string
  isActivated: boolean
  activationLink: string
}

export interface ApplicationInstance extends Model {
  id: number
  userId: number
  pseudonym: string
}

export interface RecentlyInstance extends Model {
  id: number
}

export interface FavoriteInstance extends Model {
  id: number
  userId: number
}


export interface recentlyTrackInstance extends Model {
  id: number
}

export interface favoriteTrackInstance extends Model {
  id: number
  trackId: number
  favoriteId: number
}


export interface TrackInstance extends Model {
  id: number
  name: string
  streams: number
  trackAudio: string
  albumId: number
  userId: number
  genreId: number
}

export interface AlbumInstance extends Model {
  id: number
  name: string
  userId: number
}

export interface GenreInstance extends Model {
  id: number
  name: string
  code: string
}

export interface ConversationInstance extends Model {
  id: number
  firstMemberId: number
  secondMemberId: number
}

export interface MessageInstance extends Model {
  id: number
  text: string
}
