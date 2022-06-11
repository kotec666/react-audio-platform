"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const trackValidator_1 = __importDefault(require("../validators/trackValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const checkRoleMiddleware_1 = __importDefault(require("../middleware/checkRoleMiddleware"));
const trackController_1 = __importDefault(require("../controllers/trackController"));
router.post('/add', checkRoleMiddleware_1.default.checkRole(['ADMIN', 'SINGER']), trackValidator_1.default.checkCreateTrack(), expressValidatorMiddleware_1.default.handleValidationError, trackController_1.default.addOne);
router.delete('/delete', checkRoleMiddleware_1.default.checkRole(['ADMIN', 'SINGER']), trackValidator_1.default.checkDeleteTrack(), expressValidatorMiddleware_1.default.handleValidationError, trackController_1.default.deleteOne);
router.get('/getAll', trackController_1.default.getAll);
router.get('/getAllByUserId', trackValidator_1.default.checkGetByUserIdTrack(), expressValidatorMiddleware_1.default.handleValidationError, trackController_1.default.getAllByUser);
router.get('/getAllByPage', trackValidator_1.default.checkGetByPage(), expressValidatorMiddleware_1.default.handleValidationError, trackController_1.default.getAllByPage);
exports.default = router;
