"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateToken_1 = require("../middlewares/validateToken");
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get('/users', validateToken_1.validateToken, middlewares_1.isAdmin, users_1.getAllUsers);
    router.delete('/users/:id', validateToken_1.validateToken, middlewares_1.isOwner, users_1.deleteUser);
    router.patch('/users/:id', validateToken_1.validateToken, middlewares_1.isOwner, users_1.updateUser);
    router.patch('/users/:id/status', validateToken_1.validateToken, middlewares_1.isAdmin, users_1.updateUserStatus);
};
//# sourceMappingURL=users.js.map