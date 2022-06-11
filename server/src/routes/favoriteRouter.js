"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const favoriteValidator_1 = __importDefault(require("../validators/favoriteValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const favoriteController_1 = __importDefault(require("../controllers/favoriteController"));
router.get('/getAll', favoriteValidator_1.default.checkGetFavorite(), expressValidatorMiddleware_1.default.handleValidationError, 
// authMiddleware.auth,
favoriteController_1.default.getOne);
router.get('/getAllByPage', favoriteValidator_1.default.checkGetByPage(), expressValidatorMiddleware_1.default.handleValidationError, favoriteController_1.default.getAllByPage);
router.get('/getFavoriteIdByUserId', favoriteController_1.default.getFavoriteIdByUserId);
exports.default = router;
