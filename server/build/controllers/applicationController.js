"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicationService_1 = __importDefault(require("../service/applicationService"));
class ApplicationController {
    addOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, pseudonym } = req.body;
                const application = yield applicationService_1.default.addApplication(+userId, pseudonym);
                return res.json(application);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const application = yield applicationService_1.default.deleteApplication(+userId);
                return res.json(application);
            }
            catch (e) {
                next(e);
            }
        });
    }
    acceptOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, pseudonym } = req.body;
                const application = yield applicationService_1.default.acceptApplication(+userId, pseudonym);
                return res.json(application);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applications = yield applicationService_1.default.getAllApplications();
                return res.json(applications);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new ApplicationController();
