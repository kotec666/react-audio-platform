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
const favoriteTrackService_1 = __importDefault(require("../service/favoriteTrackService"));
const models_1 = require("../models/models");
class FavoriteTrackController {
    getFavoriteByFavoriteId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _favoriteId } = req.query;
                if (!_favoriteId) {
                    return res.json('invalid params');
                }
                const favoriteTrack = yield models_1.FavoriteTrack.findAll({ where: { favoriteId: +_favoriteId } });
                return res.json({ favoriteTrack });
            }
            catch (e) {
                next(e);
            }
        });
    }
    createFavorite(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId, favoriteId } = req.body;
                const favorite = yield favoriteTrackService_1.default.create(+trackId, +favoriteId);
                return res.json(favorite);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteFavorite(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId, favoriteId } = req.body;
                const favorite = yield favoriteTrackService_1.default.deleteOne(+trackId, +favoriteId);
                return res.json(favorite);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new FavoriteTrackController();
