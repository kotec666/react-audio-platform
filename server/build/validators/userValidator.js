"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class UserValidator {
    checkCreateUser() {
        return [
            (0, express_validator_1.body)('login')
                .notEmpty()
                .isLength({ min: 3, max: 26 }),
            (0, express_validator_1.body)('email')
                .notEmpty()
                .isEmail()
                .isLength({ min: 5, max: 55 }),
            (0, express_validator_1.body)('password')
                .notEmpty()
                .isLength({ min: 5, max: 26 })
        ];
    }
    checkLoginUser() {
        return [
            (0, express_validator_1.body)('login')
                .notEmpty()
                .isLength({ min: 3, max: 26 }),
            (0, express_validator_1.body)('password')
                .notEmpty()
                .isLength({ min: 5, max: 26 })
        ];
    }
    checkLogoutUser() {
        return [
            (0, express_validator_1.cookie)('refreshToken')
                .notEmpty()
        ];
    }
    checkActivateUser() {
        return [
            (0, express_validator_1.param)('link')
                .notEmpty()
        ];
    }
    checkRefreshUser() {
        return [
            (0, express_validator_1.cookie)('refreshToken')
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
    checkGetByDataById() {
        return [
            (0, express_validator_1.param)('userId')
                .notEmpty(),
        ];
    }
    checkGetByUserDataById() {
        return [
            (0, express_validator_1.param)('userId')
                .notEmpty(),
        ];
    }
}
exports.default = new UserValidator();
