import { DataTypes } from "sequelize"
import {
    AlbumInstance,
    ApplicationInstance,
    FavoriteInstance,
    favoriteTrackInstance,
    GenreInstance,
    RecentlyInstance,
    recentlyTrackInstance,
    TokenInstance,
    TrackInstance,
    UserInstance
} from './interfaces'
import sequelize from '../utils/db'


export const Token = sequelize.define<TokenInstance>("token", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
})


export const User = sequelize.define<UserInstance>("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER",
        allowNull: false
    },
    pseudonym: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        unique: false
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    activationLink: {
        type: DataTypes.STRING,
    }
})



export const Application = sequelize.define<ApplicationInstance>("application", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    pseudonym: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        unique: true
    },
})


export const Recently = sequelize.define<RecentlyInstance>("recently", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
})


export const Favorite = sequelize.define<FavoriteInstance>("favorite", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
})


export const RecentlyTrack = sequelize.define<recentlyTrackInstance>("recently_track", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
})

export const FavoriteTrack = sequelize.define<favoriteTrackInstance>("favorite_track", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
})


export const Track = sequelize.define<TrackInstance>("track", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    streams: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    trackAudio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})


export const Album = sequelize.define<AlbumInstance>("album", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
})


export const Genre = sequelize.define<GenreInstance>("genre", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasOne(Application)
Application.belongsTo(User)

User.hasOne(Favorite)
Favorite.belongsTo(User)

User.hasOne(Recently)
Recently.belongsTo(User)

Recently.hasMany(RecentlyTrack, {as: 'recentlyTracks'})
RecentlyTrack.belongsTo(Recently)

Favorite.hasMany(FavoriteTrack, {as: 'favoriteTracks'})
FavoriteTrack.belongsTo(Favorite)

User.hasMany(Album, {as: 'userAlbums'})
Album.belongsTo(User)

User.hasMany(Track, {as: 'userTracks'})
Track.belongsTo(User)

Genre.hasMany(Track, {as: 'genreTracks'})
Track.belongsTo(Genre)

Album.hasMany(Track, {as: 'albumTracks'})
Track.belongsTo(Album)

Track.hasOne(FavoriteTrack, {as: 'tracksFavorite'}) // remove tracksFavorite? it gives unused tracksFavoriteId
FavoriteTrack.belongsTo(Track)

Track.hasOne(RecentlyTrack, {as: 'tracksRecently'}) // remove tracksRecently? it gives unused tracksRecentlyId
RecentlyTrack.belongsTo(Track)

Favorite.belongsToMany(Track, { through: {model: FavoriteTrack, unique: false} })
Recently.belongsToMany(Track, { through: {model: RecentlyTrack, unique: false} })
