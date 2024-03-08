import express from 'express'

import { deleteUser, getAllUsers, updateUser, updateUserStatus } from '../controllers/users';
import { isAdmin, isAuthenticated, isOwner } from '../middlewares';

export default(router:express.Router)=>{
    router.get('/users',isAuthenticated,isAdmin,getAllUsers); 
    router.delete('/users/:id',isAuthenticated,isOwner,deleteUser);
    router.patch('/users/:id',isAuthenticated,isOwner,updateUser);
    router.patch('/users/:id/status',isAuthenticated,isAdmin,updateUserStatus); 
} 