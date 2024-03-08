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
exports.commentValidator = exports.blogValidator = exports.messageValidator = exports.loginValidator = exports.registerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.ref("password"),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
const messageSchema = joi_1.default.object({
    senderName: joi_1.default.string().min(3).required(),
    senderEmail: joi_1.default.string().email(),
    messageBody: joi_1.default.string().min(10).required()
});
const commentSchema = joi_1.default.object({
    commentBody: joi_1.default.string().min(3).required()
});
const blogSchema = joi_1.default.object({
    title: joi_1.default.string().min(6).max(30).required(),
    body: joi_1.default.string().min(30).required(),
});
const complexityOptions = {
    min: 8,
    max: 12,
    numeric: 1,
    upperCase: 1,
    lowerCase: 1,
    symbol: 1,
};
const registerValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        const { password } = body;
        const { error, value } = registerSchema.validate(body);
        const pwdValid = (0, joi_password_complexity_1.default)(complexityOptions).validate(password);
        if (error || pwdValid.error) {
            const a = (error && !pwdValid.error) ? error.message : (!error && pwdValid.error) ? pwdValid.error.message : [error === null || error === void 0 ? void 0 : error.message, (_a = pwdValid.error) === null || _a === void 0 ? void 0 : _a.message];
            return res.status(400).json({ success: false, err: a });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ success: false, err: error });
    }
});
exports.registerValidator = registerValidator;
const loginValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const body = req.body;
        const { password } = body;
        const { error, value } = loginSchema.validate(body);
        const pwdValid = (0, joi_password_complexity_1.default)(complexityOptions).validate(password);
        if (error || pwdValid.error) {
            const a = (error && !pwdValid.error) ? error.message : (!error && pwdValid.error) ? pwdValid.error.message : [error === null || error === void 0 ? void 0 : error.message, (_b = pwdValid.error) === null || _b === void 0 ? void 0 : _b.message];
            return res.status(400).json({ success: false, err: a });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ success: false, err: error });
    }
});
exports.loginValidator = loginValidator;
const messageValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { error, value } = yield messageSchema.validate(body);
        if (error) {
            return res.status(400).json({ success: false, err: error.message });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ success: false, err: error });
    }
});
exports.messageValidator = messageValidator;
const blogValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { error, value } = yield blogSchema.validate(body);
        if (error) {
            return res.status(400).json({ success: false, err: error.message });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ success: false, err: error });
    }
});
exports.blogValidator = blogValidator;
const commentValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { error, value } = yield commentSchema.validate(body);
        if (error) {
            return res.status(400).json({ success: false, err: error.message });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ success: false, err: error });
    }
});
exports.commentValidator = commentValidator;
//# sourceMappingURL=joi_validation.js.map