import asyncHandler from 'express-async-handler';
import  jwt, { JwtPayload, decode }  from 'jsonwebtoken';
import express from 'express'
import { string } from 'joi';
import { merge } from 'lodash';
require("dotenv").config();


export const validateToken = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{

    let token;
    // console.log(req.headers);
    if(!req.headers.authorization){
        return res.status(401).json({success:false,message:"Not authenticated"});
    }
    let authHeader = req.headers.authorization?req.headers.authorization:req.headers.Authorization as any;

    if(authHeader &&authHeader.indexOf("Bearer")===0){
        token = authHeader.split(" ")[1];
        
        if(!token){
            return res.status(401).json({success:false,message:"User is not logged in"})
        }
        
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!,(err:any,decoded:any)=>{
            if(err){
                return res.status(400).json({success:false,message:err});
            }
            // console.log(decoded);
            const currentUser = decoded;
            console.log(currentUser);
            merge(req,{identity:currentUser});
            
            
             
        });
       
    }else{
        return res.status(401).json({success:false,message:"token not following rules"})
    }
    
    next(); 
}