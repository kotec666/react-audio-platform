"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ApplicationValidator {
    checkCreateApplication() {
        return [
            (0, express_validator_1.body)('userId')
                .notEmpty(),
            (0, express_validator_1.body)('pseudonym')
                .notEmpty()
                .isLength({ min: 3, max: 55 }),
        ];
    }
    checkDeleteApplication() {
        return [
            (0, express_validator_1.header)('Authorization')
        ];
    }
    checkAcceptOneApplication() {
        return [
            (0, express_validator_1.body)('userId')
                .notEmpty()
                .isNumeric(),
            (0, express_validator_1.body)('pseudonym')
                .notEmpty(),
            (0, express_validator_1.header)('Authorization')
        ];
    }
}
exports.default = new ApplicationValidator();
