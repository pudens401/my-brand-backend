import express from 'express'


import { isAuthenticated, isOwner } from '../middlewares';
import { deleteBlog, getAllBlogs, likeBlog, newBlog, readBlog, updateBlog } from '../controllers/blogs';
import { upload } from '../middlewares/multer';
import { blogValidator } from '../middlewares/joi_validation';


export default(router:express.Router)=>{
    router.get('/blogs',/*isAuthenticated,*/getAllBlogs); 
    router.delete('/blogs/:id',/*isAuthenticated,*/deleteBlog);
    router.patch('/blogs/:id',/*isAuthenticated,*/upload.single('image'),updateBlog);  
    router.post('/blogs/new',/*isAuthenticated,*/upload.single('image'),blogValidator,newBlog);
    router.get("/blogs/:id",readBlog);
    router.post("/blogs/:id/like",/*isAuthenticated,*/likeBlog);

} 