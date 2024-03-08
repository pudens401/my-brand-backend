"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../controllers/messages");
const middlewares_1 = require("../middlewares");
const joi_validation_1 = require("../middlewares/joi_validation");
exports.default = (router) => {
    router.get('/messages', middlewares_1.isAuthenticated, middlewares_1.isAdmin, messages_1.getAllMessages);
    router.get('/messages/:id', middlewares_1.isAuthenticated, middlewares_1.isAdmin, messages_1.getOneMessage);
    router.delete('/messages/:id', middlewares_1.isAuthenticated, middlewares_1.isAdmin, messages_1.deleteOneMessage);
    router.post('/messages/send', joi_validation_1.messageValidator, messages_1.sendMessage);
};
//# sourceMappingURL=messages.js.map