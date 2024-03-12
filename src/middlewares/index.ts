import express from 'express';
import {get,merge} from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
        const { id } = req.params;
        const currentUserId = String(get(req, 'identity._id'));
        console.log(currentUserId);
        if(!currentUserId){
            return res.status(403).json({success:false,message:"Forbidden"});
        }
        if(currentUserId!==id){
            return res.status(403).json({success:false,message:"Can't modify or delete other user"});
        }

        next();

    }catch(error){
        console.log(error);
        return res.status(400).json({success:false,message:error});
    }

}

export const isAuthenticated = async (req:express.Request,res:express.Response,next:express.NextFunction) =>{
    try{
        const sessionToken = req.cookies['KYZIE-AUTH'];

        if(!sessionToken){
            return res.status(403).json({success:false,message:"not logged in"});
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.status(403).json({success:false,message:"not logged in"});
        }

        merge(req, {identity: existingUser});
        
        
        
        return next();

    }catch(error){
        console.log(error);
        return res.status(400).json({success:false,message:error});
    }
}

export const isAdmin = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
        const status = String(get(req,'identity.isAdmin'));
        if(!status) res.status(403).json({success:false,message:"Not logged in"});
        if(status==="false"||!status){
            return res.status(403).json({success:false,message:"You are not an admin"});
        }
        next();
    }catch(error){
        return res.status(400).json({success:false,message:error});
    }
}