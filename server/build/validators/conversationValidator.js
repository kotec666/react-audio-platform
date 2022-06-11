"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ConversationValidator {
    checkCreateConversation() {
        return [
            (0, express_validator_1.body)('firstMemberId')
                .notEmpty(),
            (0, express_validator_1.body)('secondMemberId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkGetConvByUser() {
        return [
            (0, express_validator_1.param)('userId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkFindConvByUsers() {
        return [
            (0, express_validator_1.param)('firstMemberId')
                .notEmpty(),
            (0, express_validator_1.param)('secondMemberId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
}
exports.default = new ConversationValidator();
