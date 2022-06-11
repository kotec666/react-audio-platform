"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const genreValidator_1 = __importDefault(require("../validators/genreValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const checkRoleMiddleware_1 = __importDefault(require("../middleware/checkRoleMiddleware"));
const genreController_1 = __importDefault(require("../controllers/genreController"));
router.post('/add', checkRoleMiddleware_1.default.checkRole(['ADMIN']), genreValidator_1.default.checkCreateGenre(), expressValidatorMiddleware_1.default.handleValidationError, genreController_1.default.addOne);
router.delete('/delete/:genreId', checkRoleMiddleware_1.default.checkRole(['ADMIN']), genreValidator_1.default.checkDeleteGenre(), expressValidatorMiddleware_1.default.handleValidationError, genreController_1.default.deleteOne);
router.get('/getAll', genreController_1.default.getAll);
router.get('/getAllByPage', genreValidator_1.default.checkGetByPage(), expressValidatorMiddleware_1.default.handleValidationError, genreController_1.default.getAllByPage);
router.get('/getTracksByCode', genreValidator_1.default.checkGetByCode(), expressValidatorMiddleware_1.default.handleValidationError, genreController_1.default.getTracks);
exports.default = router;
