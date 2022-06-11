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
const messageService_1 = __importDefault(require("../service/messageService"));
class MessageController {
    addOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, text, conversationId } = req.body;
                const message = yield messageService_1.default.addMessage(+userId, text, +conversationId);
                return res.json(message);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getMessagesByConvId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { conversationId } = req.params;
                if (!conversationId) {
                    return res.json('empty params');
                }
                else {
                    const message = yield messageService_1.default.getMessagesByConversationId(+conversationId);
                    return res.json(message);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new MessageController();
