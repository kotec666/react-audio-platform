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
const genreService_1 = __importDefault(require("../service/genreService"));
class GenreController {
    addOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, code } = req.body;
                const genre = yield genreService_1.default.addGenre(name, code);
                return res.json(genre);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { genreId } = req.params;
                const genre = yield genreService_1.default.deleteGenre(+genreId);
                return res.json(genre);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genre = yield genreService_1.default.getAllGenre();
                return res.json(genre);
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
                        const genre = yield genreService_1.default.getAllPerPageAndSearchWord(+_limit, +page, search);
                        return res.json(genre);
                    }
                    else {
                        const genre = yield genreService_1.default.getAllPerPage(+_limit, +page);
                        return res.json(genre);
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
                let { _limit, page, search, code } = req.query;
                if (!_limit || !page || !code) {
                    return res.json('empty params');
                }
                else {
                    if (search) {
                        const genre = yield genreService_1.default.getTracksByCodePageAndSearch(+_limit, +page, search, code);
                        return res.json(genre);
                    }
                    else {
                        const genre = yield genreService_1.default.getTracksByCodePage(+_limit, +page, code);
                        return res.json(genre);
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new GenreController();
