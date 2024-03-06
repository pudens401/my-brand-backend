import express from 'express';

import { isAdmin, isAuthenticated } from '../middlewares';
import { createBlogComment, deleteBlogComment, getBlogComments } from '../controllers/comments';
import { commentValidator } from '../middlewares/joi_validation';




export default(router:express.Router)=>{
    router.get('/blogs/:id/comments',getBlogComments);
    router.post('/blogs/:id/comments',isAuthenticated,commentValidator,createBlogComment);
    router.delete('/blogs/:id/comments/:cId',isAuthenticated,isAdmin,deleteBlogComment);
}