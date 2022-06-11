"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static internal(message, errors = []) {
        return new ApiError(500, message);
    }
    static forbidden(message, errors = []) {
        return new ApiError(403, message);
    }
}
exports.default = ApiError;
