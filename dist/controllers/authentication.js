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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "missing creds" });
        }
        const user = yield (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(404).json({ success: false, message: "unregistered email" });
        }
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ success: false, message: "incorrect password" });
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        yield user.save();
        res.cookie('KYZIE-AUTH', (_a = user.authentication) === null || _a === void 0 ? void 0 : _a.sessionToken, { path: '/' });
        return res.status(200).json({ success: true, message: `${user.username} logged in` }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, isAdmin } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "Missing Credentials" });
        }
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already taken" });
        }
        const salt = (0, helpers_1.random)();
        const user = yield (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
            isAdmin
        });
        return res.status(201).json({ success: true, message: `${user.username} created` }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "bad request" });
    }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.cookies["KYZIE-AUTH"];
        if (!sessionToken)
            return res.status(404).json({ success: false, message: "Not logged in" });
        res.clearCookie("KYZIE-AUTH");
        res.status(200).json({ success: true, message: "logged out successfully" });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});
exports.logout = logout;
//# sourceMappingURL=authentication.js.map