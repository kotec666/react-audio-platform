"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recentlyTrackValidator_1 = __importDefault(require("../validators/recentlyTrackValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const recentlyTrackController_1 = __importDefault(require("../controllers/recentlyTrackController"));
router.post('/add', recentlyTrackValidator_1.default.checkCreateTrackRecently(), expressValidatorMiddleware_1.default.handleValidationError, recentlyTrackController_1.default.createRecently);
router.delete('/delete', recentlyTrackValidator_1.default.checkDeleteTrackRecently(), expressValidatorMiddleware_1.default.handleValidationError, recentlyTrackController_1.default.deleteRecently);
exports.default = router;
