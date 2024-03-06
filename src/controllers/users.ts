import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";




export const getAllUsers = async(req:express.Request,res:express.Response)=>{
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser =  async(req:express.Request,res:express.Response)=>{
    try{
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.status(201).json({success:true,message:"user deleted successfully"});
    }catch(error){
        return res.status(400).json({success:false,message:error});
    }
}

export const updateUser = async(req:express.Request,res:express.Response)=>{
    try{
        const {username} = req.body;
        const{id} = req.params;

        if(!username){
           return res.sendStatus(400);
        }
        const user = await getUserById(id);
        if(!user){
            return res.sendStatus(400);
        }

        user.username = username;
        await user.save();

        return res.status(200).json({success:true,message:"user updated successfully"}).end();
        
    }catch(error){
       console.log(error);
       return res.status(400).json({success:false,message:error});
    }
}