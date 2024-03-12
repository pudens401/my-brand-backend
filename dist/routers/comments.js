"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const comments_1 = require("../controllers/comments");
const joi_validation_1 = require("../middlewares/joi_validation");
const validateToken_1 = require("../middlewares/validateToken");
exports.default = (router) => {
    router.get('/blogs/:id/comments', comments_1.getBlogComments);
    router.post('/blogs/:id/comments', validateToken_1.validateToken, joi_validation_1.commentValidator, comments_1.createBlogComment);
    router.delete('/blogs/:id/comments/:cId', validateToken_1.validateToken, middlewares_1.isAdmin, comments_1.deleteBlogComment);
};
//# sourceMappingURL=comments.js.map