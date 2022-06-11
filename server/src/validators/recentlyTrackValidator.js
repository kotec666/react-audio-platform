"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class RecentlyTrackValidator {
    checkDeleteTrackRecently() {
        return [
            (0, express_validator_1.body)('recentlyId')
                .notEmpty(),
            (0, express_validator_1.body)('trackId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkCreateTrackRecently() {
        return [
            (0, express_validator_1.body)('recentlyId')
                .notEmpty(),
            (0, express_validator_1.body)('trackId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
}
exports.default = new RecentlyTrackValidator();
