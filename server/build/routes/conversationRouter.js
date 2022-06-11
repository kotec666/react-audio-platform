"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const conversationValidator_1 = __importDefault(require("../validators/conversationValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const checkRoleMiddleware_1 = __importDefault(require("../middleware/checkRoleMiddleware"));
const conversationController_1 = __importDefault(require("../controllers/conversationController"));
router.post('/add', checkRoleMiddleware_1.default.checkRole(['USER', 'SINGER', 'ADMIN']), conversationValidator_1.default.checkCreateConversation(), expressValidatorMiddleware_1.default.handleValidationError, conversationController_1.default.addOne);
router.get('/getConvByUser/:userId', checkRoleMiddleware_1.default.checkRole(['USER', 'SINGER', 'ADMIN']), conversationValidator_1.default.checkGetConvByUser(), expressValidatorMiddleware_1.default.handleValidationError, conversationController_1.default.getConvByUser);
router.get('/findConv/:firstMemberId/:secondMemberId', checkRoleMiddleware_1.default.checkRole(['USER', 'SINGER', 'ADMIN']), conversationValidator_1.default.checkFindConvByUsers(), expressValidatorMiddleware_1.default.handleValidationError, conversationController_1.default.findConv);
exports.default = router;
