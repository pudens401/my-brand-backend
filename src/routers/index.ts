import express from 'express';

import authenticationRouter from './authenticationRouter';
import { authentication } from 'helpers';
import users from './users';
import blogs from './blogs';
import messages from './messages';
import comments from './comments';


const router = express.Router();

export default():express.Router =>{

    authenticationRouter(router);
    users(router);
    blogs(router);
    messages(router);
    comments(router);
    return router;
}