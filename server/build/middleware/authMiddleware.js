"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../error/ApiError"));
const tokenService_1 = __importDefault(require("../service/tokenService"));
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') });
class authMiddleware {
    auth(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            let token = '';
            if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
                token = req.headers.authorization.split(' ')[1]; // Bearer jsakldjklasjlk
            }
            else {
                return next(ApiError_1.default.unauthorizedError());
            }
            const userData = tokenService_1.default.validateAccessToken(token);
            if (!userData) {
                return next(ApiError_1.default.unauthorizedError());
            }
            req.user = userData;
            next();
        }
        catch (e) {
            return next(ApiError_1.default.unauthorizedError());
        }
    }
}
exports.default = new authMiddleware();
