"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationRouter_1 = __importDefault(require("./authenticationRouter"));
const users_1 = __importDefault(require("./users"));
const blogs_1 = __importDefault(require("./blogs"));
const messages_1 = __importDefault(require("./messages"));
const comments_1 = __importDefault(require("./comments"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authenticationRouter_1.default)(router);
    (0, users_1.default)(router);
    (0, blogs_1.default)(router);
    (0, messages_1.default)(router);
    (0, comments_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map