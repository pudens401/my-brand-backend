import { deleteOneMessage, getAllMessages, getOneMessage, sendMessage } from '../controllers/messages'
import express from 'express'
import { isAdmin, isAuthenticated } from '../middlewares'
import { messageValidator } from '../middlewares/joi_validation';


export default(router:express.Router)=>{
    router.get('/messages',isAuthenticated,isAdmin,getAllMessages);
    router.get('/messages/:id',isAuthenticated,isAdmin,getOneMessage);
    router.delete('/messages/:id',isAuthenticated,isAdmin,deleteOneMessage);
    router.post('/messages/send',messageValidator,sendMessage);
}
