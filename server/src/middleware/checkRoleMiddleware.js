"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../error/ApiError"));
const tokenService_1 = __importDefault(require("../service/tokenService"));
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });
class checkRoleMiddleware {
    checkRole(roles) {
        return function (req, res, next) {
            if (req.method === 'OPTIONS') {
                next();
            }
            try {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    const token = req.headers.authorization.split(' ')[1]; // Bearer jsakldjklasjlk
                    if (!token) {
                        return next(ApiError_1.default.unauthorizedError());
                    }
                    const userData = tokenService_1.default.validateAccessToken(token);
                    if (!userData) {
                        return next(ApiError_1.default.unauthorizedError());
                    }
                    if (!roles.includes(userData.role)) {
                        return res.status(403).json({ message: 'Нет доступа' });
                    }
                    req.user = userData;
                    next();
                }
                else {
                    return next(ApiError_1.default.unauthorizedError());
                }
            }
            catch (e) {
                return next(ApiError_1.default.unauthorizedError());
            }
        };
    }
}
exports.default = new checkRoleMiddleware();
