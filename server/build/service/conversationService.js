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
class ConversationService {
    addConversation(firstMemberId, secondMemberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.Conversation.findOne({ where: { firstMemberId: firstMemberId, secondMemberId: secondMemberId } });
            if (candidate) {
                return ApiError_1.default.badRequest('Диалог уже существует');
            }
            const conversation = yield models_1.Conversation.create({ firstMemberId: firstMemberId, secondMemberId: secondMemberId, userId: firstMemberId });
            return { conversation: conversation };
        });
    }
    getConvByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield models_1.Conversation.findAll({ where: { [sequelize_1.Op.or]: [{ firstMemberId: userId }, { secondMemberId: userId }] } });
            return { conversation: conversation };
        });
    }
    findConvByTwoIds(firstMemberId, secondMemberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield models_1.Conversation.findOne({ where: { firstMemberId: firstMemberId, secondMemberId: secondMemberId }, order: [['id', 'DESC']] });
            return { conversation: conversation };
        });
    }
}
exports.default = new ConversationService();
