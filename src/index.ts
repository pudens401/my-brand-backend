import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import routers from './routers'
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from './Swagger.json'
import {createServer} from './utils/server';

require("dotenv").config();





// export const app = express();
// app.use(cors({
//     credentials:true,
// }));



// app.use(compression());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));


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
// mongoose.connect('mongodb://localhost:27017/mybrand');
//  connectDB();
 app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
    connectDB();
});
// app.use('/',routers());
 