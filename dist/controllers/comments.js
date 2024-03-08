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
exports.deleteBlogComment = exports.createBlogComment = exports.getBlogComments = void 0;
const blogs_1 = require("../db/blogs");
const comments_1 = require("../db/comments");
const lodash_1 = require("lodash");
const getBlogComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield (0, blogs_1.getBlogById)(id);
        if (!blog) {
            return res.status(400).json({ success: false, message: "Blog is non-existent" });
        }
        const blogComments = yield (0, comments_1.getCommentsByBlog)(id);
        return res.status(200).json({ success: true, data: blogComments });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.getBlogComments = getBlogComments;
const createBlogComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentBody } = req.body;
        const commenter = String((0, lodash_1.get)(req, 'identity.username'));
        const commenterId = String((0, lodash_1.get)(req, 'identity._id'));
        const blogId = req.params.id;
        const blog = yield (0, blogs_1.getBlogById)(blogId);
        if (!commentBody || !blogId || !commenterId) {
            return res.status(400).json({ success: false, message: "invalid fields" });
        }
        if (!blog) {
            return res.status(400).json({ success: false, message: "You can't comment on an unexistent blog" });
        }
        const newComment = yield (0, comments_1.createComment)({
            commenter,
            commentBody,
            commenterId,
            blogId
        });
        return res.status(201).json({ success: true, data: newComment });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.createBlogComment = createBlogComment;
const deleteBlogComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cId, id } = req.params;
        const blog = yield (0, blogs_1.getBlogById)(id);
        const toDeleteComment = yield (0, comments_1.getBlogCommentById)(cId);
        if (!blog || !toDeleteComment) {
            return res.status(400).json({ success: false, message: "Innexistent blog comment" });
        }
        const deletedComment = yield (0, comments_1.deleteComment)(cId);
        return res.status(201).json({ success: true, message: "Comment deleted" });
    }
    catch (error) {
        return res.status(400).json({ success: false });
    }
});
exports.deleteBlogComment = deleteBlogComment;
//# sourceMappingURL=comments.js.map