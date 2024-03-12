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
exports.isAdmin = exports.isAuthenticated = exports.isOwner = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/users");
const isOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentUserId = String((0, lodash_1.get)(req, 'identity._id'));
        console.log(currentUserId);
        if (!currentUserId) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }
        if (currentUserId !== id) {
            return res.status(403).json({ success: false, message: "Can't modify or delete other user" });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error });
    }
});
exports.isOwner = isOwner;
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.cookies['KYZIE-AUTH'];
        if (!sessionToken) {
            return res.status(403).json({ success: false, message: "not logged in" });
        }
        const existingUser = yield (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            return res.status(403).json({ success: false, message: "not logged in" });
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error });
    }
});
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = String((0, lodash_1.get)(req, 'identity.isAdmin'));
        if (!status)
            res.status(403).json({ success: false, message: "Not logged in" });
        if (status === "false" || !status) {
            return res.status(403).json({ success: false, message: "You are not an admin" });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=index.js.map