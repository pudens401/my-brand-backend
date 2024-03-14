import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";

import { get } from "lodash";




export const getAllUsers = async(req:express.Request,res:express.Response)=>{
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.sendStatus(409);
    }
}

export const deleteUser =  async(req:express.Request,res:express.Response)=>{
    try{
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.status(201).json({success:true,message:"user deleted successfully"});
    }catch(error){
        return res.status(409).json({success:false,message:error});
    }
}

export const updateUser = async(req:express.Request,res:express.Response)=>{
    try{
        const {username} = req.body;
        const{id} = req.params;

        if(!username){
           return res.status(400).json({success:false,message:"Empty fields"});
        }
        const user = await getUserById(id);
        if(!user){
            return res.status(404).json({success:false,message:"No user is existent"});
        }

        user.username = username;
        await user.save();

        return res.status(204).json({success:true,message:"user updated successfully"});
        
    }catch(error){
       console.log(error);
       return res.status(409).json({success:false,message:error});
    }
}

export const updateUserStatus = async(req:express.Request,res:express.Response)=>{
    try{
        const {isAdmin} = req.body;
        const{id} = req.params;
        

        if(isAdmin===undefined||isAdmin===null){
           return res.status(400).json({success:false,message:"Value is empty"});
        }
        const user = await getUserById(id);
        if(!user){
            return res.status(404).json({success:false,message:"No user is existent"});
        }

        user.isAdmin = isAdmin;
        await user.save();

        res.status(204).json({success:true,message:"user status updated successfully"});
        
    }catch(error){
       console.log(error);
       return res.status(409).json({success:false,message:error});
    }
}