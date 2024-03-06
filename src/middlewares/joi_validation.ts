import joi from 'joi' 
import joiPasswordComplexity from 'joi-password-complexity'
import express from 'express'

const registerSchema = joi.object({
    username:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    confirmPassword: joi.ref("password"), 
});

const loginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
});

const messageSchema = joi.object({
    senderName:joi.string().min(3).required(),
    senderEmail:joi.string().email(),
    messageBody:joi.string().min(10).required()   
});

const commentSchema = joi.object({
    commentBody:joi.string().min(3).required()
})

const blogSchema = joi.object({
    title:joi.string().min(6).max(30).required(),
    body:joi.string().min(30).required(),
});

const complexityOptions = {
    min:8,
    max:12,
    numeric:1,
    upperCase:1,
    lowerCase:1,
    symbol:1,
}

export const registerValidator = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    
    try{
        const body = req.body;
        const {password} = body;
        const {error,value} = registerSchema.validate(body);
        const pwdValid = joiPasswordComplexity(complexityOptions).validate(password);

        if(error||pwdValid.error){
            const a = (error&&!pwdValid.error)?error.message:(!error&&pwdValid.error)?pwdValid.error.message:[error?.message,pwdValid.error?.message];
            return res.status(400).json({success:false,err:a});
        }
        next();
    }catch(error){
        return res.status(400).json({success:false,err:error});
    }
}

export const loginValidator = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    
    try{
        const body = req.body;
        const {password} = body;
        const {error,value} = loginSchema.validate(body);
        const pwdValid = joiPasswordComplexity(complexityOptions).validate(password);

        if(error||pwdValid.error){
            const a = (error&&!pwdValid.error)?error.message:(!error&&pwdValid.error)?pwdValid.error.message:[error?.message,pwdValid.error?.message];
            return res.status(400).json({success:false,err:a});
        }
        next();
    }catch(error){
        return res.status(400).json({success:false,err:error});
    }
}

export const messageValidator = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    

    try{
        const body = req.body;
        const {error,value} = await messageSchema.validate(body);

        if(error){
        return res.status(400).json({success:false,err:error.message});
        }
        next();
    }catch(error){
        return res.status(400).json({success:false,err:error});
    }
}

export const blogValidator = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    
    try{
        const body = req.body;
        const {error,value} = await blogSchema.validate(body);

    if(error){
        return res.status(400).json({success:false,err:error.message});
        }
        next();
    }catch(error){
        return res.status(400).json({success:false,err:error});
    }
    
}

export const commentValidator = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    
    try{
        const body = req.body;
        const {error,value} = await commentSchema.validate(body);

    if(error){
        return res.status(400).json({success:false,err:error.message});
        }
        next();
    }catch(error){
        return res.status(400).json({success:false,err:error});
    }
    
}

