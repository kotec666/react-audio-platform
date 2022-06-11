"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userValidator_1 = __importDefault(require("./../validators/userValidator"));
const userController_1 = __importDefault(require("../controllers/userController"));
const expressValidatorMiddleware_1 = __importDefault(require("../middleware/expressValidatorMiddleware"));
const passport_1 = __importDefault(require("passport"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            refreshToken: req.cookies.refreshToken,
            accessToken: req.cookies.accessToken,
            user: req.user,
        });
    }
});
router.get('/login/failed', (req, res) => {
    throw ApiError_1.default.unauthorizedError();
});
router.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile']
}));
router.get('/auth/google/callback', passport_1.default.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: `/login/failed`
}));
router.get('/github', passport_1.default.authenticate('github', { scope: ['email', 'profile']
}));
router.get('/auth/github/callback', passport_1.default.authenticate('github', {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: `/login/failed`
}));
router.post('/registration', userValidator_1.default.checkCreateUser(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.registration);
router.post('/login', userValidator_1.default.checkLoginUser(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.login);
router.post('/logout', userValidator_1.default.checkLogoutUser(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.logout);
router.get('/activate/:link', userValidator_1.default.checkActivateUser(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.activate);
router.get('/refresh', userValidator_1.default.checkRefreshUser(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.refresh);
router.get('/getAllByPage', userValidator_1.default.checkGetByPage(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.getAllByPage);
router.get('/getSingerDataById/:userId', userValidator_1.default.checkGetByDataById(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.getSingerDataBySingerId);
router.get('/getUserDataByUserId/:userId', userValidator_1.default.checkGetByUserDataById(), expressValidatorMiddleware_1.default.handleValidationError, userController_1.default.getUserDataByUserId);
router.get('/getAll', userController_1.default.getUsers);
exports.default = router;
