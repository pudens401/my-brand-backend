import express from 'express';

import { login, register } from '../controllers/authentication';

export default(router:express.Router)=>{
    router.post('/auth/signup',register);
    router.post('/auth/login',login);
}