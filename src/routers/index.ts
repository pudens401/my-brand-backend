import express from 'express';

import authenticationRouter from './authenticationRouter';
import { authentication } from 'helpers';
import users from './users';

const router = express.Router();

export default():express.Router =>{

    authenticationRouter(router);
    users(router);
    return router;
}