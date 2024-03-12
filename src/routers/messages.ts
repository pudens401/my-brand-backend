import { deleteOneMessage, getAllMessages, getOneMessage, sendMessage } from '../controllers/messages'
import express from 'express'
import { isAdmin, isAuthenticated } from '../middlewares'
import { messageValidator } from '../middlewares/joi_validation';
import { validateToken } from '../middlewares/validateToken';


export default(router:express.Router)=>{
    router.get('/messages',validateToken,isAdmin,getAllMessages);
    router.get('/messages/:id',validateToken,isAdmin,getOneMessage);
    router.delete('/messages/:id',validateToken,isAdmin,deleteOneMessage);
    router.post('/messages/send',messageValidator,sendMessage);
}
