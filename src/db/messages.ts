import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    senderName:{type:String,required:true},
    senderEmail:{type:String,required:false},
    messageBody:{type:String,required:true},
    read:{type:Boolean,default:false}
});

export const messageModel = mongoose.model('messages',MessageSchema);    //Creating a class of messages

export const getMessages =()=> messageModel.find();  //Find all items that respect the message model class
export const getMessagesById = (id:string)=> messageModel.findById(id);
export const createMessage = (values: Record<string,any>)=> new messageModel(values)
    .save().then((message) => message.toObject());
export const deleteMessage = (id:string)=> messageModel.findByIdAndDelete(id);
