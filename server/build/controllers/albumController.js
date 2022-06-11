"use strict";
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
const albumService_1 = __importDefault(require("../service/albumService"));
class AlbumController {
    addOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, userId, albumTracks } = req.body;
                const files = req.files;
                if (!files) {
                    return res.status(204).json('Загрузите треки плиз');
                }
                const album = yield albumService_1.default.addAlbum(name, +userId, albumTracks, files);
                return res.json(album);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { albumId } = req.body;
                const { user } = req;
                if (!user) {
                    return res.json('Пользователя нет');
                }
                else {
                    const album = yield albumService_1.default.deleteAlbum(+albumId, user);
                    return res.json(album);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const album = yield albumService_1.default.getAllAlbum();
                return res.json(album);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const album = yield albumService_1.default.getAllAlbumByUserId(+userId);
                return res.json(album);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllByPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _limit, page, search } = req.query;
                if (!_limit || !page) {
                    return res.json('empty params');
                }
                else {
                    if (search) {
                        const album = yield albumService_1.default.getAllPerPageAndSearchWord(+_limit, +page, search);
                        return res.json(album);
                    }
                    else {
                        const album = yield albumService_1.default.getAllPerPage(+_limit, +page);
                        return res.json(album);
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    getTracks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _limit, page, search, albumId } = req.query;
                if (!_limit || !page || !albumId) {
                    return res.json('empty params');
                }
                else {
                    if (search) {
                        const tracks = yield albumService_1.default.getTracksByAlbumIdAndSearch(+_limit, +page, +albumId, search);
                        return res.json(tracks);
                    }
                    else {
                        const tracks = yield albumService_1.default.getTracksByAlbumId(+_limit, +page, +albumId);
                        return res.json(tracks);
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new AlbumController();
