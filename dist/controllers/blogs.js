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
exports.likeBlog = exports.readBlog = exports.updateBlog = exports.deleteBlog = exports.getAllBlogs = exports.newBlog = void 0;
const blogs_1 = require("../db/blogs");
const lodash_1 = require("lodash");
const cloudinary_1 = require("../config/cloudinary");
const newBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, body } = req.body;
        const imageFile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const cloudinaryRes = yield cloudinary_1.cloudinary.uploader.upload(imageFile, { folder: 'blog_images' });
        const imgUrl = cloudinaryRes.secure_url;
        if (!title || !body || !imgUrl) {
            return res.status(400).json({ success: false, message: "Empty fields" });
        }
        const blog = yield (0, blogs_1.createBlog)({
            title,
            body,
            image: {
                url: cloudinaryRes.secure_url,
                public_id: cloudinaryRes.public_id,
            },
        });
        // console.log(blog.image);
        return res.status(201).json({ success: true, message: "blog created" }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
});
exports.newBlog = newBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield (0, blogs_1.getBlogs)();
        return res.status(200).json(blogs);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getAllBlogs = getAllBlogs;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedBlog = yield (0, blogs_1.deleteBlogById)(id);
        if (!deletedBlog) {
            return res.status(400).json({ success: false, message: "inexistent blog" });
        }
        const existingImage = {
            url: deletedBlog.image.url,
            public_id: deletedBlog.image.public_id,
        };
        yield cloudinary_1.cloudinary.uploader.destroy(existingImage.public_id);
        return res.status(201).json({ success: true, message: "Blog deleted" });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});
exports.deleteBlog = deleteBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body } = req.body;
        const { id } = req.params;
        const imageFile = req.file ? req.file.path : false;
        const blog = yield (0, blogs_1.getBlogById)(id);
        if (!blog) {
            return res.status(400).json({ success: false, message: "Blog non-existent" });
        }
        if (imageFile) {
            const cloudinaryRes = yield cloudinary_1.cloudinary.uploader.upload(imageFile, { folder: 'blog_images' });
            const existingImage = {
                url: blog.image.url,
                public_id: blog.image.public_id,
            };
            yield cloudinary_1.cloudinary.uploader.destroy(existingImage.public_id);
            blog.image = {
                url: cloudinaryRes.secure_url,
                public_id: cloudinaryRes.public_id,
            };
        }
        blog.body = body;
        blog.title = title;
        yield blog.save();
        return res.status(201).json({ success: true, message: "Blog updated" }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error });
    }
});
exports.updateBlog = updateBlog;
const readBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let wantedBlog = yield (0, blogs_1.getBlogById)(id);
        if (!wantedBlog) {
            return res.status(400).json({ sucess: false, message: "Inexistent blog" });
        }
        return res.status(200).json({ sucess: true, data: wantedBlog });
    }
    catch (error) {
        return res.status(400).json({ sucess: false, message: "bad request" });
    }
});
exports.readBlog = readBlog;
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield (0, blogs_1.getBlogById)(id);
        if (!blog) {
            return res.status(400).json({ success: false, message: "Blog non-existent" });
        }
        const currentUserId = String((0, lodash_1.get)(req, 'identity._id'));
        const likeStatus = blog.likes.indexOf(currentUserId);
        if (likeStatus !== -1) {
            blog.likes.splice(likeStatus, 1);
            blog.save();
        }
        else {
            blog.likes.unshift(currentUserId);
            blog.save();
        }
        return res.status(201).json({ success: true, message: "like updated" });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
});
exports.likeBlog = likeBlog;
//# sourceMappingURL=blogs.js.map