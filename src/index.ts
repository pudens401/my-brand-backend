import express, { Router } from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import routers from './routers'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express"
// import * as swaggerDocument from "./Swagger.json"
import {cloudinary} from './config/cloudinary'

const app = express();
app.use(cors({
    credentials:true,
}));



app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());



app.listen(5000,()=>{
    console.log('Server started at localhost:5000....');
});

// const MONGO_URL = 

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/mybrand');
mongoose.connection.on('error',(error:Error)=>console.log(error));


app.use('/',routers());
 