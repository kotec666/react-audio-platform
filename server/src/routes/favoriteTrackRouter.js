"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const favoriteTrackValidator_1 = __importDefault(require("../validators/favoriteTrackValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const favoriteTrackController_1 = __importDefault(require("../controllers/favoriteTrackController"));
router.get('/getAll', favoriteTrackController_1.default.getFavoriteByFavoriteId);
router.post('/add', favoriteTrackValidator_1.default.checkCreateTrackFavorite(), expressValidatorMiddleware_1.default.handleValidationError, favoriteTrackController_1.default.createFavorite);
router.delete('/delete', favoriteTrackValidator_1.default.checkDeleteTrackFavorite(), expressValidatorMiddleware_1.default.handleValidationError, favoriteTrackController_1.default.deleteFavorite);
exports.default = router;
