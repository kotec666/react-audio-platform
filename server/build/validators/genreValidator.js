"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class GenreValidator {
    checkCreateGenre() {
        return [
            (0, express_validator_1.body)('name')
                .notEmpty(),
            (0, express_validator_1.body)('code')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkDeleteGenre() {
        return [
            (0, express_validator_1.param)('genreId')
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
    checkGetByCode() {
        return [
            (0, express_validator_1.query)('code')
                .notEmpty(),
        ];
    }
}
exports.default = new GenreValidator();
