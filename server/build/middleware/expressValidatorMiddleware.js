"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class Middleware {
    handleValidationError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.json({ message: error.array()[0].msg + ' ' + error.array()[0].param });
        }
        next();
    }
}
exports.default = new Middleware();
