"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class FavoriteValidator {
    checkGetFavorite() {
        return [
            (0, express_validator_1.query)('userId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
                .notEmpty()
        ];
    }
    checkGetByPage() {
        return [
            (0, express_validator_1.query)('_limit')
                .notEmpty(),
            (0, express_validator_1.query)('page')
                .notEmpty(),
            (0, express_validator_1.query)('search')
                .optional(),
            (0, express_validator_1.query)('userId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
                .notEmpty()
        ];
    }
}
exports.default = new FavoriteValidator();
