import express from 'express'
import { validateToken } from '../middlewares/validateToken';

import { deleteUser, getAllUsers, updateUser, updateUserStatus } from '../controllers/users';
import { isAdmin, isAuthenticated, isOwner } from '../middlewares';

export default(router:express.Router)=>{
    router.get('/users',validateToken,isAdmin,getAllUsers); 
    router.delete('/users/:id',validateToken,isOwner,deleteUser);
    router.patch('/users/:id',validateToken,isOwner,updateUser);
    router.patch('/users/:id/status',validateToken,isAdmin,updateUserStatus); 
} 