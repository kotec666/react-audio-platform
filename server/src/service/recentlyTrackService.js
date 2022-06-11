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
const models_1 = require("../models/models");
const ApiError_1 = __importDefault(require("../error/ApiError"));
class RecentlyTrackService {
    create(trackId, recentlyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.RecentlyTrack.findOne({
                where: {
                    trackId: trackId,
                    recentlyId: recentlyId
                }
            });
            if (candidate) {
                throw ApiError_1.default.badRequest(`Недавний трек уже существует, недавний трек должен быть уникален`);
            }
            const recentlyTrack = yield models_1.RecentlyTrack.create({ trackId, recentlyId });
            return { recentlyTrack: recentlyTrack };
        });
    }
    deleteOne(trackId, recentlyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const recentlyTrack = yield models_1.RecentlyTrack.findAll({
                where: {
                    trackId,
                    recentlyId
                }
            });
            const recently = recentlyTrack[0];
            yield recently.destroy();
            return recently;
        });
    }
}
exports.default = new RecentlyTrackService();
