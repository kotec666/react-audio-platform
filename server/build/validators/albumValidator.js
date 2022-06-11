"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AlbumValidator {
    checkCreateAlbum() {
        return [
            (0, express_validator_1.body)('name')
                .notEmpty(),
            (0, express_validator_1.body)('userId')
                .notEmpty(),
            (0, express_validator_1.body)('albumTracks')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkDeleteAlbum() {
        return [
            (0, express_validator_1.body)('albumId')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkGetByUser() {
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
    checkGetTracksByAlbumId() {
        return [
            (0, express_validator_1.query)('albumId')
                .notEmpty(),
        ];
    }
}
exports.default = new AlbumValidator();
