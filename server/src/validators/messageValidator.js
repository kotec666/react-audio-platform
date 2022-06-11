"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class MessageValidator {
    checkCreateMessage() {
        return [
            (0, express_validator_1.body)('userId')
                .notEmpty(),
            (0, express_validator_1.body)('text')
                .notEmpty(),
            (0, express_validator_1.body)('conversationId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkGetMessagesByConvId() {
        return [
            (0, express_validator_1.param)('conversationId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
}
exports.default = new MessageValidator();
