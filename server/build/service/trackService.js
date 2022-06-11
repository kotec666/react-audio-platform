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
const uuid = __importStar(require("uuid"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
class TrackService {
    addTrack(trackInfo, files, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const generateName = () => {
                return uuid.v4() + '.mp3';
            };
            let tracks = JSON.parse(trackInfo);
            if (tracks.length === 1) {
                let fileName = generateName();
                yield models_1.Track.create({
                    name: tracks[0].name,
                    streams: 0,
                    trackAudio: fileName,
                    albumId: null,
                    userId: userId,
                    genreId: tracks[0].genreId
                });
                yield files.trackAudio.mv(path_1.default.resolve(__dirname, '..', 'static', fileName));
                return { track: 'track' };
            }
            else {
                tracks.forEach((track, i) => {
                    let fileName = generateName();
                    models_1.Track.create({
                        name: track.name,
                        streams: 0,
                        trackAudio: fileName,
                        albumId: null,
                        userId: userId,
                        genreId: track.genreId
                    });
                    files.trackAudio[i].mv(path_1.default.resolve(__dirname, '..', 'static', fileName));
                });
                return { track: 'track' };
            }
        });
    }
    deleteTrack(trackId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield models_1.Track.findOne({ where: { id: trackId } });
            if (!track) {
                throw ApiError_1.default.badRequest(`Трека с id: ${trackId} не существует, или трек вам не принадлежит`);
            }
            if (user.role === 'ADMIN' || track.userId === user.id) {
                yield track.destroy();
                return { status: 204 };
            }
            else {
                return { status: 404 };
            }
        });
    }
    getAllTrack() {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield models_1.Track.findAll();
            return track;
        });
    }
    getAllTrackByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield models_1.Track.findAll({ where: { userId: userId } });
            return track;
        });
    }
    getBySearchWord(_limit, page, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const track = yield models_1.Track.findAndCountAll({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${search}%`
                        }
                    },
                    offset: +offset, limit: +_limit
                });
                return { track: track };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new TrackService();
