import express from 'express'


import { isAuthenticated, isOwner,isAdmin } from '../middlewares';
import { deleteBlog, getAllBlogs, likeBlog, newBlog, readBlog, updateBlog } from '../controllers/blogs';
import { upload } from '../middlewares/multer';
import { blogValidator } from '../middlewares/joi_validation';


export default(router:express.Router)=>{
    router.get('/blogs',getAllBlogs); 
    router.delete('/blogs/:id',isAuthenticated,isAdmin,deleteBlog);
    router.patch('/blogs/:id',isAuthenticated,isAdmin,upload.single('image'),updateBlog);  
    router.post('/blogs/new',isAuthenticated,isAdmin,upload.single('image'),blogValidator,newBlog);
    router.get("/blogs/:id",readBlog);
    router.post("/blogs/:id/like",isAuthenticated,likeBlog);
} 