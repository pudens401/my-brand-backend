"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogById = exports.deleteBlogById = exports.createBlog = exports.getBlogById = exports.getBlogsByDate = exports.getBlogs = exports.BlogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    likes: { type: Array, default: [] },
    image: { type: Object },
});
exports.BlogModel = mongoose_1.default.model('blog', BlogSchema); //creating a blog document
const getBlogs = () => exports.BlogModel.find();
exports.getBlogs = getBlogs;
const getBlogsByDate = () => exports.BlogModel.findOne({ date: String });
exports.getBlogsByDate = getBlogsByDate;
const getBlogById = (id) => exports.BlogModel.findById(id);
exports.getBlogById = getBlogById;
const createBlog = (values) => new exports.BlogModel(values)
    .save().then((blog) => blog.toObject());
exports.createBlog = createBlog;
const deleteBlogById = (id) => exports.BlogModel.findOneAndDelete({ _id: id });
exports.deleteBlogById = deleteBlogById;
const updateBlogById = (id, values) => exports.BlogModel.findByIdAndUpdate(id, values);
exports.updateBlogById = updateBlogById;
//# sourceMappingURL=blogs.js.map