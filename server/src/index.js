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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const db_1 = __importDefault(require("./utils/db"));
const models = require('./models/models');
require('./passport');
const ErrorHandlingMiddleware_1 = __importDefault(require("./middleware/ErrorHandlingMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
require('dotenv').config({ path: __dirname + './../.env' });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cookie_session_1.default)({
    name: 'accessToken',
    keys: ['keyOne'],
    maxAge: 24 * 60 * 60 * 100
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    origin: `${process.env.CLIENT_URL}`
}));
app.use((0, express_fileupload_1.default)({}));
app.use('/api', routes_1.default);
// Обработка ошибок, последний Middleware
app.use(ErrorHandlingMiddleware_1.default.errorHandling);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.sync();
            app.listen(PORT);
            console.log(PORT);
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
