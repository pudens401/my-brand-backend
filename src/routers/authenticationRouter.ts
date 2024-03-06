import express from 'express';
import { loginValidator, registerValidator } from '../middlewares/joi_validation';

import { login, register } from '../controllers/authentication';

export default(router:express.Router)=>{
    router.post('/auth/signup',registerValidator,register);
    router.post('/auth/login',loginValidator,login);
}