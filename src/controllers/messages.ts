import express from 'express'
import {createMessage, deleteMessage, getMessages, getMessagesById} from '../db/messages'


export const getAllMessages = async (req:express.Request,res:express.Response)=>{

    try{
        const allMessages = await getMessages();
        return res.status(200).json(allMessages)

    }catch(error){
        return res.status(400).json({success:false,message: error});
    }
}

export const getOneMessage = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;
        const retrievedMessage = await getMessagesById(id);
        if(!retrievedMessage){
            return res.status(404).json({success:false,message:"message non-existent"});
        }
        retrievedMessage.read = true;
        retrievedMessage.save();
        return res.status(200).json({success:true,data:retrievedMessage});

    }catch(error){
        return res.status(400).json({success:false,message:error})
    }

}

export const deleteOneMessage = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;
        const deletedMessage = await deleteMessage(id);
        if(!deletedMessage){
            return res.status(404).json({success:false,message:"message non-existent"});
        }
        return res.status(200).json({success:true,message:"Message deleted successfully"});
    }catch(error){
        return res.status(400).json({success:false,message:error});
    }
}

export const sendMessage = async (req:express.Request,res:express.Response)=>{
    try{
        const {senderName,senderEmail,messageBody,read} = req.body;
        if(!senderName||!messageBody){
            return res.status(400).json({success:false,message:"Empty fields"});
        }

        const newMessage = await createMessage({
            senderName,
            senderEmail,
            messageBody,
            read,
        });
        return res.status(201).json({success:true,message:"Message sent succesfully"});
    }catch(error){
        return res.status(400).json({success:false,message:error});
    }
}

