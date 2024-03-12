import express from 'express';
import { loginValidator, registerValidator } from '../middlewares/joi_validation';

import { login, logout, register } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares/index';
import { validateToken } from '../middlewares/validateToken';

export default(router:express.Router)=>{
    router.post('/auth/signup',registerValidator,register);
    router.post('/auth/login',loginValidator,login);
    router.post('/auth/logout',validateToken,logout);
    // router.post('/auth/logout',validateToken,logout);
}