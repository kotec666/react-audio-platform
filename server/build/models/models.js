"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Conversation = exports.Genre = exports.Album = exports.Track = exports.FavoriteTrack = exports.RecentlyTrack = exports.Favorite = exports.Recently = exports.Application = exports.User = exports.Token = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
exports.Token = db_1.default.define("token", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    refreshToken: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
});
exports.User = db_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "USER",
        allowNull: false
    },
    pseudonym: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        unique: false
    },
    isActivated: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    activationLink: {
        type: sequelize_1.DataTypes.STRING,
    }
});
exports.Application = db_1.default.define("application", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    pseudonym: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        unique: true
    },
});
exports.Recently = db_1.default.define("recently", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
});
exports.Favorite = db_1.default.define("favorite", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
});
exports.RecentlyTrack = db_1.default.define("recently_track", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
});
exports.FavoriteTrack = db_1.default.define("favorite_track", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
});
exports.Track = db_1.default.define("track", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    streams: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    trackAudio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});
exports.Album = db_1.default.define("album", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
});
exports.Genre = db_1.default.define("genre", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
});
exports.Conversation = db_1.default.define("conversation", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstMemberId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    secondMemberId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
});
exports.Message = db_1.default.define("message", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
});
exports.User.hasMany(exports.Message, { as: 'userMessages' });
exports.Message.belongsTo(exports.User);
exports.Conversation.hasMany(exports.Message, { as: 'conversationMessages' });
exports.Message.belongsTo(exports.Conversation);
exports.User.hasMany(exports.Conversation, { as: 'userConversations' });
exports.Conversation.belongsTo(exports.User);
exports.User.hasOne(exports.Token);
exports.Token.belongsTo(exports.User);
exports.User.hasOne(exports.Application);
exports.Application.belongsTo(exports.User);
exports.User.hasOne(exports.Favorite);
exports.Favorite.belongsTo(exports.User);
exports.User.hasOne(exports.Recently);
exports.Recently.belongsTo(exports.User);
exports.Recently.hasMany(exports.RecentlyTrack, { as: 'recentlyTracks' });
exports.RecentlyTrack.belongsTo(exports.Recently);
exports.Favorite.hasMany(exports.FavoriteTrack, { as: 'favoriteTracks' });
exports.FavoriteTrack.belongsTo(exports.Favorite);
exports.User.hasMany(exports.Album, { as: 'userAlbums' });
exports.Album.belongsTo(exports.User);
exports.User.hasMany(exports.Track, { as: 'userTracks' });
exports.Track.belongsTo(exports.User);
exports.Genre.hasMany(exports.Track, { as: 'genreTracks' });
exports.Track.belongsTo(exports.Genre);
exports.Album.hasMany(exports.Track, { as: 'albumTracks' });
exports.Track.belongsTo(exports.Album);
exports.Track.hasMany(exports.FavoriteTrack, { as: 'tracksFavorite' });
exports.FavoriteTrack.belongsTo(exports.Track);
exports.Track.hasMany(exports.RecentlyTrack, { as: 'tracksRecently' });
exports.RecentlyTrack.belongsTo(exports.Track);
exports.Favorite.belongsToMany(exports.Track, { through: { model: exports.FavoriteTrack, unique: false }, as: 'userTracksFavorite' });
exports.Recently.belongsToMany(exports.Track, { through: { model: exports.RecentlyTrack, unique: false }, as: 'userTracksRecently' });
exports.Track.belongsToMany(exports.Favorite, { through: { model: exports.FavoriteTrack, unique: false } });
exports.Track.belongsToMany(exports.Recently, { through: { model: exports.RecentlyTrack, unique: false } });
