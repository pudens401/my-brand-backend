import { deleteOneMessage, getAllMessages, getOneMessage, sendMessage } from '../controllers/messages'
import express from 'express'
import { isAuthenticated } from '../middlewares'


export default(router:express.Router)=>{
    router.get('/messages',isAuthenticated,getAllMessages);
    router.get('/messages/:id',isAuthenticated,getOneMessage);
    router.delete('/messages/:id',isAuthenticated,deleteOneMessage);
    router.post('/messages/send',sendMessage);
}