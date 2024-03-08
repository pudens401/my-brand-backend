"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = exports.getBlogCommentById = exports.getCommentsByBlog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    commenter: { type: String, required: true, default: "Anonymous User" },
    commentBody: { type: String, required: true },
    commenterId: { type: String },
    blogId: { type: String }
    //date
});
const CommentModel = mongoose_1.default.model("comments", CommentSchema);
const getCommentsByBlog = (blogId) => CommentModel.find({ blogId: blogId });
exports.getCommentsByBlog = getCommentsByBlog;
const getBlogCommentById = (cId) => CommentModel.findById(cId);
exports.getBlogCommentById = getBlogCommentById;
const createComment = (values) => new CommentModel(values)
    .save().then((comment) => comment.toObject());
exports.createComment = createComment;
const deleteComment = (id) => CommentModel.findByIdAndDelete(id);
exports.deleteComment = deleteComment;
//# sourceMappingURL=comments.js.map