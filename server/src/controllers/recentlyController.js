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
class RecentlyController {
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (typeof userId === 'string') {
                    let _userId = parseInt(userId);
                    const recently = yield models_1.Recently.findOne({
                        where: { userId: _userId },
                        include: [
                            { model: models_1.Track, through: models_1.RecentlyTrack }
                        ]
                    });
                    return res.json({ recently });
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
                let parsedUserId;
                if (!_limit || !page) {
                    return res.json('empty params');
                }
                else {
                    if (search) {
                        if (typeof userId === 'string') {
                            parsedUserId = parseInt(userId);
                            if (typeof page === 'string' && typeof _limit === 'string') {
                                offset = parseInt(page) * parseInt(_limit) - parseInt(_limit);
                                const recently = yield models_1.Recently.findAndCountAll({
                                    where: { userId: parsedUserId },
                                    include: [{ model: models_1.Track, as: 'userTracksRecently', where: { name: { [sequelize_1.Op.like]: `%${search}%` } } }],
                                    offset: +offset,
                                    limit: +_limit
                                });
                                return res.json({ recently: recently });
                            }
                        }
                    }
                    else {
                        if (typeof userId === 'string') {
                            parsedUserId = parseInt(userId);
                            if (typeof page === 'string' && typeof _limit === 'string') {
                                offset = parseInt(page) * parseInt(_limit) - parseInt(_limit);
                                const recently = yield models_1.Recently.findAndCountAll({
                                    where: { userId: parsedUserId },
                                    include: [{ model: models_1.Track, as: 'userTracksRecently' }], offset: +offset, limit: +_limit
                                });
                                return res.json({ recently: recently });
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
    getRecentlyIdByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _userId } = req.query;
            if (!_userId) {
                return res.json('invalid params');
            }
            else {
                if (typeof _userId === 'string') {
                    let userId = parseInt(_userId);
                    const recentlyId = yield models_1.Recently.findOne({ where: { userId: userId } });
                    return res.json(recentlyId);
                }
            }
        });
    }
}
exports.default = new RecentlyController();
