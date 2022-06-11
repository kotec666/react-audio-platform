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
const sequelize_1 = require("sequelize");
class FavoriteController {
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.query;
                let _userId;
                if (!userId) {
                    return res.json('invalid params');
                }
                if (typeof userId === 'string') {
                    _userId = parseInt(userId);
                    const favorite = yield models_1.Favorite.findOne({
                        where: { userId: _userId },
                        include: [
                            { model: models_1.Track, through: models_1.FavoriteTrack }
                        ]
                    });
                    return res.json({ favorite });
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllByPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _limit, page, search, userId } = req.query;
                let offset;
                let _userId;
                if (!_limit || !page || !userId) {
                    return res.json('empty params');
                }
                else {
                    if (search) {
                        if (typeof userId === 'string') {
                            _userId = parseInt(userId);
                            if (typeof page === 'string' && typeof _limit === 'string') {
                                offset = parseInt(page) * parseInt(_limit) - parseInt(_limit);
                                const favorite = yield models_1.Favorite.findAndCountAll({
                                    where: { userId: _userId },
                                    include: [{ model: models_1.Track, as: 'userTracksFavorite', where: { name: { [sequelize_1.Op.like]: `%${search}%` } } }],
                                    offset: +offset,
                                    limit: +_limit
                                });
                                return res.json({ favorite: favorite });
                            }
                        }
                    }
                    else {
                        if (typeof userId === 'string') {
                            _userId = parseInt(userId);
                            if (typeof page === 'string' && typeof _limit === 'string') {
                                offset = parseInt(page) * parseInt(_limit) - parseInt(_limit);
                                const favorite = yield models_1.Favorite.findAndCountAll({
                                    where: { userId: _userId },
                                    include: [{ model: models_1.Track, as: 'userTracksFavorite' }], offset: +offset, limit: +_limit
                                });
                                return res.json({ favorite: favorite });
                            }
                        }
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    getFavoriteIdByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _userId } = req.query;
                let userId;
                if (!_userId) {
                    return res.json('invalid params');
                }
                else {
                    if (typeof _userId === 'string') {
                        userId = parseInt(_userId);
                        const favoriteId = yield models_1.Favorite.findOne({ where: { userId: userId } });
                        return res.json(favoriteId);
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new FavoriteController();
