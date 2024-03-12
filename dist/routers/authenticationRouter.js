"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_validation_1 = require("../middlewares/joi_validation");
const authentication_1 = require("../controllers/authentication");
const validateToken_1 = require("../middlewares/validateToken");
exports.default = (router) => {
    router.post('/auth/signup', joi_validation_1.registerValidator, authentication_1.register);
    router.post('/auth/login', joi_validation_1.loginValidator, authentication_1.login);
    router.post('/auth/logout', validateToken_1.validateToken, authentication_1.logout);
    // router.post('/auth/logout',validateToken,logout);
};
//# sourceMappingURL=authenticationRouter.js.map