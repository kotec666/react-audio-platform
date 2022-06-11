"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TrackValidator {
    checkCreateTrack() {
        return [
            (0, express_validator_1.body)('trackInfo')
                .notEmpty(),
            (0, express_validator_1.body)('userId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkDeleteTrack() {
        return [
            (0, express_validator_1.body)('trackId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkGetByUserIdTrack() {
        return [
            (0, express_validator_1.body)('userId')
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
                .optional()
        ];
    }
}
exports.default = new TrackValidator();
