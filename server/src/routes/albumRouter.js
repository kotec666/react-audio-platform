"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const albumValidator_1 = __importDefault(require("../validators/albumValidator"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const checkRoleMiddleware_1 = __importDefault(require("../middleware/checkRoleMiddleware"));
const albumController_1 = __importDefault(require("../controllers/albumController"));
router.post('/add', checkRoleMiddleware_1.default.checkRole(['ADMIN', 'SINGER']), albumValidator_1.default.checkCreateAlbum(), expressValidatorMiddleware_1.default.handleValidationError, albumController_1.default.addOne);
router.delete('/delete', checkRoleMiddleware_1.default.checkRole(['ADMIN', 'SINGER']), albumValidator_1.default.checkDeleteAlbum(), expressValidatorMiddleware_1.default.handleValidationError, albumController_1.default.deleteOne);
router.get('/getAll', albumController_1.default.getAll);
router.get('/getAllByUser', albumValidator_1.default.checkGetByUser(), expressValidatorMiddleware_1.default.handleValidationError, albumController_1.default.getAllByUser);
router.get('/getAllByPage', albumValidator_1.default.checkGetByPage(), expressValidatorMiddleware_1.default.handleValidationError, albumController_1.default.getAllByPage);
router.get('/getTracksByAlbumId', albumValidator_1.default.checkGetTracksByAlbumId(), expressValidatorMiddleware_1.default.handleValidationError, albumController_1.default.getTracks);
exports.default = router;
