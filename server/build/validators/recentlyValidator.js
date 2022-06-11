"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class RecentlyValidator {
    checkGetRecently() {
        return [
            (0, express_validator_1.body)('userId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkGetByPage() {
        return [
            (0, express_validator_1.query)('_limit')
                .notEmpty(),
            (0, express_validator_1.query)('page')
                .notEmpty(),
            (0, express_validator_1.query)('search')
                .optional()
        ];
    }
}
exports.default = new RecentlyValidator();
