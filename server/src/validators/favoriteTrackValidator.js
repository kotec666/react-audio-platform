"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class FavoriteTrackValidator {
    checkDeleteTrackFavorite() {
        return [
            (0, express_validator_1.body)('favoriteId')
                .notEmpty(),
            (0, express_validator_1.body)('trackId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkCreateTrackFavorite() {
        return [
            (0, express_validator_1.body)('favoriteId')
                .notEmpty(),
            (0, express_validator_1.body)('trackId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkGetTrackFavorite() {
        return [
            (0, express_validator_1.body)('favoriteId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
}
exports.default = new FavoriteTrackValidator();
