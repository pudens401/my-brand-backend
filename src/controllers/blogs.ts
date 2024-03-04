import { createBlog ,getBlogs,getBlogById,getBlogsByDate,deleteBlogById,updateBlogById} from "../db/blogs";
import express from "express";
import { get } from "lodash";
import { cloudinary } from "../config/cloudinary";





export const newBlog = async(req:express.Request,res:express.Response)=>{
    try{    
        
        const{title,body} = req.body;
        const imageFile = req.file?.path;

        const cloudinaryRes = await cloudinary.uploader.upload(imageFile!,{folder:'blog_images'});
        const imgUrl = cloudinaryRes.secure_url;

        if(!title||!body||!imgUrl){
            return res.status(400).json({success:false,message:"Empty fields"});
        }
        
        const blog = await createBlog({
            title,
            body, 
            image:{
                    url:cloudinaryRes.secure_url,
                    public_id:cloudinaryRes.public_id, 
            },
        });

        // console.log(blog.image);
        return res.status(201).json({success:true,message:"blog created"}).end();
        
    }catch(error){
       console.log(error);
       return res.status(400).json({success:false,error:error});
    }
}

export const getAllBlogs = async(req:express.Request,res:express.Response)=>{
    try{
        const blogs = await getBlogs();
        return res.status(200).json(blogs);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteBlog = async(req:express.Request,res:express.Response)=>{
    try{
        const { id } = req.params;

        const deletedBlog = await deleteBlogById(id);
        if(!deletedBlog){
            return res.status(400).json({success:false,message:"inexistent blog"})
        }
        const existingImage = {
            url:deletedBlog.image.url,
            public_id:deletedBlog.image.public_id,
        }

        await cloudinary.uploader.destroy(existingImage.public_id);

        return res.status(201).json({success:true,message:"Blog deleted"});
    }catch(error){
        return res.status(400).json({success:false});
    }
}

export const updateBlog = async(req:express.Request,res:express.Response)=>{
    try{
        const {title,body} = req.body;
        const{id} = req.params;
        const imageFile = req.file?.path;

        const cloudinaryRes = await cloudinary.uploader.upload(imageFile!,{folder:'blog_images'});
        // const imgUrl = cloudinaryRes.secure_url;

        // if(!title||!body||!image){
        //    return res.sendStatus(400);
        // }
        const blog = await getBlogById(id);
        if(!blog){
            return res.status(400).json({success:false,message:"Blog non-existent"});
        }
        
        const existingImage = {
            url:blog.image.url,
            public_id:blog.image.public_id,
        }

        await cloudinary.uploader.destroy(existingImage.public_id);

        blog.body = body;
        blog.title = title;
        blog.image ={
            url:cloudinaryRes.secure_url,
            public_id:cloudinaryRes.public_id, 
        },
        await blog.save();

        return res.status(201).json({success:true,message:"Blog updated"}).end();
        
    }catch(error){
       console.log(error);
       return res.status(400).json({success:false,error:error}); 
    }
}

export const readBlog = async (req:express.Request,res:express.Response)=>{


    try{
    const {id} = req.params;
    let wantedBlog = await getBlogById(id);
    
        if(!wantedBlog){
        return res.status(400).json({sucess:false,message:"Inexistent blog"});
        }
        return res.status(200).json({sucess:true,data:wantedBlog});
    }catch(error){
        return res.status(400).json({sucess:false,message:"bad request"});
    }
}

export const likeBlog = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;
        const blog = await getBlogById(id);
        if(!blog){
            return res.status(400).json({success:false,message:"Blog non-existent"});
        }

        const currentUserId = String(get(req, 'identity._id'));
        const likeStatus = blog.likes.indexOf(currentUserId);

        if(likeStatus!==-1){
            blog.likes.splice(likeStatus,1);
            blog.save();
        }else{
            blog.likes.unshift(currentUserId);
            blog.save();
        }
        return res.status(201).json({success:true,message:"like updated"});

        
    }catch(error){
        return res.status(400).json({success:false,message:error});
    }
}