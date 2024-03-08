"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const blogs_1 = require("../controllers/blogs");
const multer_1 = require("../middlewares/multer");
const joi_validation_1 = require("../middlewares/joi_validation");
exports.default = (router) => {
    router.get('/blogs', blogs_1.getAllBlogs);
    router.delete('/blogs/:id', middlewares_1.isAuthenticated, middlewares_1.isAdmin, blogs_1.deleteBlog);
    router.patch('/blogs/:id', middlewares_1.isAuthenticated, middlewares_1.isAdmin, multer_1.upload.single('image'), blogs_1.updateBlog);
    router.post('/blogs/new', middlewares_1.isAuthenticated, middlewares_1.isAdmin, multer_1.upload.single('image'), joi_validation_1.blogValidator, blogs_1.newBlog);
    router.get("/blogs/:id", blogs_1.readBlog);
    router.post("/blogs/:id/like", middlewares_1.isAuthenticated, blogs_1.likeBlog);
};
//# sourceMappingURL=blogs.js.map