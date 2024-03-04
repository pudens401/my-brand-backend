import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";


export const login = async (req:express.Request,res:express.Response)=>{
    try{
        const{ email, password} = req.body ;

        if(!email || !password){
            return res.status(400).json({success:false,message:"missing creds"});
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.status(400).json({success:false,message:"bad request"});
        }

        const expectedHash = authentication(user.authentication!.salt!,password);

        if(user.authentication!.password!==expectedHash){
            return res.status(403).json({success:false,message:"incorrect password"});
        }

        const salt = random();
        user.authentication!.sessionToken = authentication(salt,user._id.toString());

        await user.save();

        res.cookie('KYZIE-AUTH', user.authentication?.sessionToken, {domain:'localhost',path:'/'});

        return res.status(200).json({success:true,message:`${user.username} logged in`}).end();
    }catch(error){
        console.log(error);
        return res.status(400);
    }
}




export const register = async(req:express.Request,res:express.Response)=>{
    try{

        const{email,password,username} = req.body;

        if(!email||!password||!username){
            return res.status(400).json({success:false,message:"Missing Credentials"});
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({success:false,message:"Email is already taken"});
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password:authentication(salt,password),
            },
        });

        return res.status(201).json({success:true,message:`${user.username} created`}).end(); 
    }catch(error){
       console.log(error);
       return res.status(400).json({success:false,message:"bad request"}); 
    }
}