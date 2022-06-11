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
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const passport_1 = __importDefault(require("passport"));
const models_1 = require("./models/models");
const userService_1 = __importDefault(require("./service/userService"));
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../.env') });
passport_1.default.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/api/user/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield models_1.User.findOne({ where: { email: profile.emails[0].value } });
            if (!foundUser) {
                const userData = yield userService_1.default.registration(`${profile.displayName}`, `${profile.emails[0].value}${process.env.JWT_ACCESS_SECRET}`, `${profile.emails[0].value}`);
                done(null, userData.user, { accessToken: userData.accessToken }, { refreshToken: userData.refreshToken });
            }
            else {
                const userData = yield userService_1.default.login(`${foundUser.login}`, `${profile.emails[0].value}${process.env.JWT_ACCESS_SECRET}`);
                done(null, userData.user, { accessToken: userData.accessToken }, { refreshToken: userData.refreshToken });
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}));
passport_1.default.use(new GithubStrategy({
    clientID: `e506041b69fe9707bf49`,
    clientSecret: `6cfb9ebbf59a0969ebb13389c161fa0462ecfe19`,
    callbackURL: "/api/user/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield models_1.User.findOne({ where: { login: profile.username } });
            if (!foundUser) {
                const userData = yield userService_1.default.registration(`${profile.username}`, `${profile.username}${process.env.JWT_ACCESS_SECRET}`, `${profile._json.email}`);
                done(null, userData.user, { accessToken: userData.accessToken }, { refreshToken: userData.refreshToken });
            }
            else {
                const userData = yield userService_1.default.login(`${profile.username}`, `${profile.username}${process.env.JWT_ACCESS_SECRET}`);
                done(null, userData.user, { accessToken: userData.accessToken }, { refreshToken: userData.refreshToken });
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passport_1.default;
