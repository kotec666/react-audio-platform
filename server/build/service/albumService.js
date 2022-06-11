"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const path_1 = __importDefault(require("path"));
const uuid = __importStar(require("uuid"));
const sequelize_1 = require("sequelize");
class AlbumService {
    addAlbum(name, userId, albumTracks, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield models_1.Album.create({ name, userId });
            const generateName = () => {
                return uuid.v4() + '.mp3';
            };
            let albumInfo = JSON.parse(albumTracks);
            if (albumInfo.length === 1) {
                let fileName = generateName();
                yield models_1.Track.create({
                    name: albumInfo[0].name,
                    streams: 0,
                    trackAudio: fileName,
                    albumId: album.id,
                    userId: userId,
                    genreId: albumInfo[0].genreId
                });
                yield files.trackAudio.mv(path_1.default.resolve(__dirname, '..', 'static', fileName));
                return { album: album };
            }
            else {
                albumInfo.forEach((track, i) => {
                    let fileName = generateName();
                    models_1.Track.create({
                        name: track.name,
                        streams: 0,
                        trackAudio: fileName,
                        albumId: album.id,
                        userId: userId,
                        genreId: track.genreId
                    });
                    files.trackAudio[i].mv(path_1.default.resolve(__dirname, '..', 'static', fileName));
                });
                return { album: album };
            }
        });
    }
    deleteAlbum(albumId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield models_1.Album.findOne({ where: { id: albumId, userId: user.id } });
            if (!album) {
                throw ApiError_1.default.badRequest(`Альбома с id: ${albumId} не существует, или альбом вам не принадлежит`);
            }
            if (user.role === 'ADMIN' || album.userId === user.id) {
                yield album.destroy();
                return { status: 204 };
            }
            else {
                return { status: 404 };
            }
        });
    }
    getAllAlbum() {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield models_1.Album.findAll({
                include: [{ model: models_1.Track, as: 'albumTracks' }]
            });
            return album;
        });
    }
    getAllPerPage(_limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const album = yield models_1.Album.findAndCountAll({
                    include: [{ model: models_1.Track, as: 'albumTracks' }], offset: +offset, limit: +_limit
                });
                return { album: album };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAllPerPageAndSearchWord(_limit, page, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const album = yield models_1.Album.findAndCountAll({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${search}%`
                        }
                    },
                    include: [{ model: models_1.Track, as: 'albumTracks' }], offset: +offset, limit: +_limit
                });
                return { album: album };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAllAlbumByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield models_1.Album.findAll({
                where: { userId: userId },
                include: [{ model: models_1.Track, as: 'albumTracks' }]
            });
            return album;
        });
    }
    getTracksByAlbumId(_limit, page, albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const tracks = yield models_1.Album.findAndCountAll({
                    include: [{ model: models_1.Track, as: 'albumTracks', where: { albumId: albumId } }], offset: +offset, limit: +_limit
                });
                return { album: tracks };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getTracksByAlbumIdAndSearch(_limit, page, albumId, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const track = yield models_1.Album.findAndCountAll({
                    include: [{ model: models_1.Track, as: 'albumTracks', where: { name: { [sequelize_1.Op.like]: `%${search}%` }, albumId: albumId, } }], offset: +offset, limit: +_limit
                });
                return { album: track };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new AlbumService();
