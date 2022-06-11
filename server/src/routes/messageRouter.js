"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const messageValidator_1 = __importDefault(require("../validators/messageValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const checkRoleMiddleware_1 = __importDefault(require("../middleware/checkRoleMiddleware"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
router.post('/add', checkRoleMiddleware_1.default.checkRole(['USER', 'SINGER', 'ADMIN']), messageValidator_1.default.checkCreateMessage(), expressValidatorMiddleware_1.default.handleValidationError, messageController_1.default.addOne);
router.get('/getMessagesByConvId/:conversationId', checkRoleMiddleware_1.default.checkRole(['USER', 'SINGER', 'ADMIN']), messageValidator_1.default.checkGetMessagesByConvId(), expressValidatorMiddleware_1.default.handleValidationError, messageController_1.default.getMessagesByConvId);
exports.default = router;
