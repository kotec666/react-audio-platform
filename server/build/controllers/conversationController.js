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
const conversationService_1 = __importDefault(require("../service/conversationService"));
class ConversationController {
    addOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstMemberId, secondMemberId } = req.body;
                const conversation = yield conversationService_1.default.addConversation(+firstMemberId, +secondMemberId);
                return res.json(conversation);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getConvByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userId } = req.params;
                if (!userId) {
                    return res.json('empty params');
                }
                else {
                    const conversation = yield conversationService_1.default.getConvByUserId(+userId);
                    return res.json(conversation);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    findConv(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { firstMemberId, secondMemberId } = req.params;
                if (!firstMemberId || !secondMemberId) {
                    return res.json('empty params');
                }
                else {
                    const conversation = yield conversationService_1.default.findConvByTwoIds(+firstMemberId, +secondMemberId);
                    return res.json(conversation);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ConversationController();
