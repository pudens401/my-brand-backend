import express from 'express';

import { isAuthenticated } from '../middlewares';
import { createBlogComment, deleteBlogComment, getBlogComments } from '../controllers/comments';




export default(router:express.Router)=>{
    router.get('/blogs/:id/comments',getBlogComments);
    router.post('/blogs/:id/comments/new',isAuthenticated,createBlogComment);
    router.delete('/blogs/:id/comments/:cId',isAuthenticated,deleteBlogComment)
}