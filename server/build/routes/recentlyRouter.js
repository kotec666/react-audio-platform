"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recentlyValidator_1 = __importDefault(require("../validators/recentlyValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const recentlyController_1 = __importDefault(require("../controllers/recentlyController"));
router.get('/getAll', recentlyValidator_1.default.checkGetRecently(), expressValidatorMiddleware_1.default.handleValidationError, 
// authMiddleware.auth,
recentlyController_1.default.getOne);
router.get('/getAllByPage', recentlyValidator_1.default.checkGetByPage(), expressValidatorMiddleware_1.default.handleValidationError, recentlyController_1.default.getAllByPage);
router.get('/getRecentlyIdByUserId', recentlyController_1.default.getRecentlyIdByUserId);
exports.default = router;
