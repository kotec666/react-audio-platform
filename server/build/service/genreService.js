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
const sequelize_1 = require("sequelize");
class GenreService {
    addGenre(name, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.Genre.findOne({ where: { name: name, code: code } });
            if (candidate) {
                return ApiError_1.default.badRequest('жанр уже существует');
            }
            const genre = yield models_1.Genre.create({ name, code });
            return { genre: genre };
        });
    }
    deleteGenre(genreId) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield models_1.Genre.findOne({ where: { id: genreId } });
            if (!genre) {
                throw ApiError_1.default.badRequest(`Жанра с id: ${genreId} не существует`);
            }
            yield genre.destroy();
            return { status: 204 };
        });
    }
    getAllGenre() {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield models_1.Genre.findAll({ order: [['id', 'DESC']] });
            return genre;
        });
    }
    getAllPerPage(_limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const genre = yield models_1.Genre.findAndCountAll({
                    include: [{ model: models_1.Track, as: 'genreTracks' }], offset: +offset, limit: +_limit
                });
                return { genre: genre };
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
                const genre = yield models_1.Genre.findAndCountAll({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${search}%`
                        }
                    },
                    include: [{ model: models_1.Track, as: 'genreTracks' }], offset: +offset, limit: +_limit
                });
                return { genre: genre };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getTracksByCodePage(_limit, page, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                console.log(page, _limit, code);
                const genre = yield models_1.Genre.findAndCountAll({
                    where: { code: code },
                    include: [{ model: models_1.Track, as: 'genreTracks' }], offset: +offset, limit: +_limit
                });
                return { genre: genre };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getTracksByCodePageAndSearch(_limit, page, search, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const track = yield models_1.Genre.findAndCountAll({
                    where: { code: code },
                    include: [{
                            model: models_1.Track, as: 'genreTracks',
                            where: {
                                name: {
                                    [sequelize_1.Op.like]: `%${search}%`
                                }
                            }
                        }], offset: +offset, limit: +_limit
                });
                return { genre: track };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new GenreService();
