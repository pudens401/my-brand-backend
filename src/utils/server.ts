import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import routers from '../routers'
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from '../Swagger.json'


export  const createServer = ()=>{
const app = express();
app.use(cors({
    credentials:true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/',routers());
return app
}
