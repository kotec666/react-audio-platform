"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const applicationController_1 = __importDefault(require("../controllers/applicationController"));
const applicationValidator_1 = __importDefault(require("../validators/applicationValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const checkRoleMiddleware_1 = __importDefault(require("../middleware/checkRoleMiddleware"));
router.post('/add', applicationValidator_1.default.checkCreateApplication(), expressValidatorMiddleware_1.default.handleValidationError, applicationController_1.default.addOne);
router.delete('/delete/:userId', checkRoleMiddleware_1.default.checkRole(['ADMIN']), applicationValidator_1.default.checkDeleteApplication(), expressValidatorMiddleware_1.default.handleValidationError, applicationController_1.default.deleteOne);
router.put('/accept', checkRoleMiddleware_1.default.checkRole(['ADMIN']), applicationValidator_1.default.checkAcceptOneApplication(), expressValidatorMiddleware_1.default.handleValidationError, applicationController_1.default.acceptOne);
router.get('/getAll', checkRoleMiddleware_1.default.checkRole(['ADMIN']), applicationController_1.default.getAll);
exports.default = router;
