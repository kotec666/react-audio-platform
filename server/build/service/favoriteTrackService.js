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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
class FavoriteTrackService {
    create(trackId, favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteTrack = yield models_1.FavoriteTrack.create({ trackId, favoriteId });
            return { favoriteTrack: favoriteTrack };
        });
    }
    deleteOne(trackId, favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteTracks = yield models_1.FavoriteTrack.findAll({
                where: {
                    trackId,
                    favoriteId
                }
            });
            const favorite = favoriteTracks[0];
            yield favorite.destroy();
            return favorite;
        });
    }
}
exports.default = new FavoriteTrackService();
