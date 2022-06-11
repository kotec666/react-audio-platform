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
class ApplicationService {
    addApplication(userId, pseudonym) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.Application.findOne({ where: { userId: userId } });
            if (candidate) {
                throw ApiError_1.default.badRequest(`Заявка от пользователя с id: ${userId} уже существует, заявка должна быть уникальной`);
            }
            const user = yield models_1.User.findOne({ where: { id: userId } });
            let isSinger;
            if (user) {
                isSinger = user.role === 'SINGER';
                console.log(isSinger);
                if (!isSinger) {
                    const uniquePseudonym = yield models_1.Application.findOne({ where: { pseudonym: pseudonym } });
                    if (uniquePseudonym) {
                        throw ApiError_1.default.badRequest(`Заявка с псевдонимом: ${pseudonym} уже существует, псевдоним должeн быть уникален`);
                    }
                    const uniqueUserPseudonym = yield models_1.User.findOne({ where: { pseudonym: pseudonym } });
                    if (uniqueUserPseudonym) {
                        throw ApiError_1.default.badRequest(`Пользователь с псевдонимом: ${pseudonym} уже существует, псевдоним должeн быть уникален`);
                    }
                    const application = yield models_1.Application.create({ userId: userId, pseudonym: `${pseudonym}` });
                    return { application: application };
                }
                else {
                    throw ApiError_1.default.badRequest(`У вас уже есть статус SINGER`);
                }
            }
            else {
                throw ApiError_1.default.badRequest(`ошибка, нет пользователя`);
            }
        });
    }
    deleteApplication(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const applications = yield models_1.Application.findOne({ where: { userId: userId } });
            if (!applications) {
                throw ApiError_1.default.badRequest(`Заявка от пользователя с id: ${userId} не существует`);
            }
            yield applications.destroy();
            return { status: 204 };
        });
    }
    acceptApplication(userId, pseudonym) {
        return __awaiter(this, void 0, void 0, function* () {
            const applications = yield models_1.Application.findOne({ where: { userId: userId } });
            if (!applications) {
                throw ApiError_1.default.badRequest(`Заявка от пользователя с id: ${userId} не существует`);
            }
            const user = yield models_1.User.findOne({ where: { id: userId } });
            if (!user) {
                throw ApiError_1.default.badRequest(`Пользователя с id: ${userId} не существует`);
            }
            user.role = 'SINGER';
            user.pseudonym = `${pseudonym}`;
            yield user.save();
            yield this.deleteApplication(userId);
            return { status: 200 };
        });
    }
    getAllApplications() {
        return __awaiter(this, void 0, void 0, function* () {
            const applications = yield models_1.Application.findAll();
            return { applications: applications };
        });
    }
}
exports.default = new ApplicationService();
