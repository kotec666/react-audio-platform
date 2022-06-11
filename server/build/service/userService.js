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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailService_1 = __importDefault(require("./mailService"));
const tokenService_1 = __importDefault(require("./tokenService"));
const userDto_1 = __importDefault(require("../dtos/userDto"));
const uuid = __importStar(require("uuid"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const sequelize_1 = require("sequelize");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });
class UserService {
    registration(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.User.findOne({ where: { email: email, login: login } });
            if (candidate) {
                throw ApiError_1.default.badRequest(`Пользователь с адресом ${email} уже существует, логин должен быть уникален`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const activationLink = uuid.v4();
            if (email === 'null') {
                email = uuid.v4();
            }
            const user = yield models_1.User.create({
                login: login,
                password: hashPassword,
                email: email,
                role: 'USER',
                pseudonym: '',
                isActivated: false,
                activationLink: activationLink
            });
            if (email !== 'null') {
                yield mailService_1.default.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
            }
            const userDto = new userDto_1.default(user);
            const tokens = tokenService_1.default.generateTokens(Object.assign({}, userDto));
            yield tokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
            const favorite = yield models_1.Favorite.create({ userId: userDto.id });
            const recently = yield models_1.Recently.create({ userId: userDto.id });
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { activationLink: activationLink } });
            if (!user) {
                throw ApiError_1.default.badRequest('Неккоректная ссылка активации');
            }
            user.isActivated = true;
            yield user.save();
        });
    }
    login(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { login: login } });
            if (!user) {
                throw ApiError_1.default.badRequest(`Пользователя с логином ${login} не существует`);
            }
            let isPasswordEquals;
            if (user.password) {
                isPasswordEquals = yield bcrypt_1.default.compare(password, user.password);
            }
            if (!isPasswordEquals) {
                throw ApiError_1.default.badRequest(`Неверный пароль`);
            }
            const userDto = new userDto_1.default(user);
            const tokens = tokenService_1.default.generateTokens(Object.assign({}, userDto));
            yield tokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield tokenService_1.default.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError_1.default.unauthorizedError();
            }
            const userData = tokenService_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield tokenService_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError_1.default.unauthorizedError();
            }
            const user = yield models_1.User.findOne({ where: { id: userData.id } });
            if (!user) {
                return { user: userDto_1.default, accessToken: '', refreshToken: '' };
            }
            const userDto = new userDto_1.default(user);
            const tokens = tokenService_1.default.generateTokens(Object.assign({}, userDto));
            yield tokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.findAll({ attributes: ['id', 'login', 'role', 'pseudonym'] });
                return { user: users };
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
                const singer = yield models_1.User.findAndCountAll({
                    attributes: ['id', 'pseudonym'],
                    where: {
                        pseudonym: {
                            [sequelize_1.Op.like]: `%${search}%`
                        }, role: 'SINGER'
                    }, offset: +offset, limit: +_limit
                });
                return { singer: singer };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAllPerPage(_limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = page * _limit - _limit;
                const singer = yield models_1.User.findAndCountAll({
                    attributes: ['id', 'pseudonym'],
                    where: {
                        role: 'SINGER'
                    }, offset: +offset, limit: +_limit
                });
                return { singer: singer };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getSingerDataById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const singer = yield models_1.User.findAll({
                    where: { id: userId, role: 'SINGER' },
                    attributes: ['id', 'login', 'email', 'role', 'pseudonym'],
                    include: [
                        { model: models_1.Track, as: 'userTracks' },
                        { model: models_1.Album, as: 'userAlbums' }
                    ]
                });
                return { singer: singer };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getUserDataById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({
                    where: { id: userId },
                    attributes: ['id', 'login', 'email', 'role', 'pseudonym'],
                });
                return user;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new UserService();
