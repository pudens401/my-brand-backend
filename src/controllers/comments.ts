import { getBlogById } from "../db/blogs";
import { createComment, deleteComment, getBlogCommentById, getCommentsByBlog } from "../db/comments";
import express from "express";
import { get } from "lodash";

export const getBlogComments = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;
        const blog = await getBlogById(id);
        if(!blog){
            return res.status(400).json({success:false,message:"Blog is non-existent"});
        }
        const blogComments = await getCommentsByBlog(id);
        return res.status(200).json({success:true,data:blogComments});
        
    }catch(error){
        return res.status(400).json({success:false,message:error});
    }
}

export const createBlogComment = async (req:express.Request,res:express.Response)=>{
    try{
      const {commentBody} = req.body;
      const commenter = String(get(req,'identity.username'))
      const commenterId = String(get(req,'identity._id'));
      const blogId = req.params.id;
      const blog = await getBlogById(blogId);
      if(!commentBody||!blogId||!commenterId){
        return res.status(400).json({success:false,message:"invalid fields"});
      }
      if(!blog){
        return res.status(400).json({success:false,message:"You can't comment on an unexistent blog"});
      }
      const newComment = await createComment({
        commenter,
        commentBody,
        commenterId,
        blogId
      });
      
      return res.status(201).json({success:true,data:newComment});
        
    }catch(error){
        return res.status(400).json({success:false,message:error});
    }
}

export const deleteBlogComment = async(req:express.Request,res:express.Response)=>{
    try{
        const { cId, id } = req.params;
        const blog = await getBlogById(id);
        const toDeleteComment = await getBlogCommentById(cId);
        if(!blog||!toDeleteComment){
            return res.status(400).json({success:false,message:"Innexistent blog comment"});
        }

        const deletedComment = await deleteComment(cId);

        return res.status(201).json({success:true,message:"Comment deleted"});
    }catch(error){
        return res.status(400).json({success:false});
    }
}

