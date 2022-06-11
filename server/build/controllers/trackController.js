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
const trackService_1 = __importDefault(require("../service/trackService"));
class TrackController {
    addOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackInfo, userId } = req.body;
                const files = req.files;
                const track = yield trackService_1.default.addTrack(trackInfo, files, +userId);
                return res.json(track);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId } = req.body;
                const { user } = req;
                if (!user) {
                    return res.json('Пользователя нет');
                }
                else {
                    const track = yield trackService_1.default.deleteTrack(+trackId, user);
                    return res.json(track);
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
                const track = yield trackService_1.default.getAllTrack();
                return res.json(track);
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
                const track = yield trackService_1.default.getAllTrackByUserId(+userId);
                return res.json(track);
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
                        const track = yield trackService_1.default.getBySearchWord(+_limit, +page, search);
                        return res.json(track);
                    }
                    else {
                        return res.json('tracks not found');
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new TrackController();
