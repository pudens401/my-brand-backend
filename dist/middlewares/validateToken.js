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
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
require("dotenv").config();
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    let authHeader = req.headers.authorization ? req.headers.authorization : req.headers.Authorization;
    if (authHeader && authHeader.indexOf("Bearer") === 0) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "User is not logged in" });
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            // console.log(decoded);
            const currentUser = decoded;
            console.log(currentUser);
            (0, lodash_1.merge)(req, { identity: currentUser });
        });
    }
    else {
        return res.status(401).json({ success: false, message: "token not following rules" });
    }
    next();
});
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map