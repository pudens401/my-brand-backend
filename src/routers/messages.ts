import { deleteOneMessage, getAllMessages, getOneMessage, sendMessage } from '../controllers/messages'
import express from 'express'
import { isAuthenticated } from '../middlewares'
import { messageValidator } from '../middlewares/joi_validation';


export default(router:express.Router)=>{
    router.get('/messages',isAuthenticated,getAllMessages);
    router.get('/messages/:id',isAuthenticated,getOneMessage);
    router.delete('/messages/:id',isAuthenticated,deleteOneMessage);
    router.post('/messages/send',messageValidator,sendMessage);
}
