import express from 'express'

import { isAuthenticated, isOwner,isAdmin } from '../middlewares';
import { deleteBlog, getAllBlogs, likeBlog, newBlog, readBlog, updateBlog } from '../controllers/blogs';
import { upload } from '../middlewares/multer';
import { blogValidator } from '../middlewares/joi_validation';
import { validateToken } from '../middlewares/validateToken';

export default(router:express.Router)=>{
    router.get('/blogs',getAllBlogs); 
    router.delete('/blogs/:id',validateToken,isAdmin,deleteBlog);
    router.patch('/blogs/:id',validateToken,isAdmin,upload.single('image'),updateBlog);  
    router.post('/blogs/new',validateToken,isAdmin,upload.single('image'),blogValidator,newBlog);
    router.get("/blogs/:id",readBlog);
    router.post("/blogs/:id/like",validateToken,likeBlog);
} 