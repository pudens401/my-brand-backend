"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_validation_1 = require("../middlewares/joi_validation");
const authentication_1 = require("../controllers/authentication");
const index_1 = require("../middlewares/index");
exports.default = (router) => {
    router.post('/auth/signup', joi_validation_1.registerValidator, authentication_1.register);
    router.post('/auth/login', joi_validation_1.loginValidator, authentication_1.login);
    router.post('/auth/logout', index_1.isAuthenticated, authentication_1.logout);
};
//# sourceMappingURL=authenticationRouter.js.map