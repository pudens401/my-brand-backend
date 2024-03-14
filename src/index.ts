import mongoose from 'mongoose'
import {createServer} from './utils/server';
require("dotenv").config();

const app = createServer();
const PORT = process.env.DEV_PORT?Number(process.env.DEV_PORT):5000;

mongoose.Promise = Promise;
export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_URI!);
        console.log("Connected to Mongo DB successfully");
    }catch(error:any){
        console.log("Connection failed"+error.message);
    }
}

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
    connectDB();
});

 