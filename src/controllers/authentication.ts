import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";
import jwt from 'jsonwebtoken';



export const login = async (req:express.Request,res:express.Response)=>{
    try{
        const{ email, password} = req.body ;

        if(!email || !password){
            return res.status(400).json({success:false,message:"missing creds"});
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.status(404).json({success:false,message:"unregistered email"});
        }

        const expectedHash:string = authentication(user.authentication!.salt!,password);

        if(user.authentication!.password!==expectedHash){
            return res.status(403).json({success:false,message:"incorrect password"});
        }


        const accessToken:string = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
                isAdmin:user.isAdmin
            }

        },process.env.ACCESS_TOKEN_SECRET!
        );



        const salt:string = random();
        user.authentication!.sessionToken = authentication(salt,user._id.toString());

        await user.save();

        res.cookie('KYZIE-AUTH', user.authentication?.sessionToken, {path:'/'});
        console.log(user.authentication?.sessionToken);
        return res.status(200).json({success:true,accessToken,message:`${user.username} logged in`,token:accessToken}).end();
    }catch(error){
        console.log(error);
        return res.status(400);
    }
}




export const register = async(req:express.Request,res:express.Response)=>{
    try{

        const{email,password,username,isAdmin} = req.body;

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
                password:authentication(salt,password),  //hashing password
            },
            isAdmin
        });

        return res.status(201).json({success:true,message:`${user.username} created`}).end(); 
    }catch(error){
       console.log(error);
       return res.status(400).json({success:false,message:"bad request"}); 
    }
}

export const logout = async(req:express.Request,res:express.Response)=>{
    try{
        const sessionToken = req.cookies["KYZIE-AUTH"];
        if(!sessionToken) return res.status(404).json({success:false,message:"Not logged in"});
        res.clearCookie("KYZIE-AUTH");
        res.status(200).json({success:true,message:"logged out successfully"});
    }catch(error){
        return res.status(400).json({success:false,error:error});
    }
}