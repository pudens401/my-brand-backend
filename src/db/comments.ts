import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    commenter:{type:String,required:true,default:"Anonymous User"},
    commentBody:{type:String,required:true},
    commenterId:{type:String},
    blogId:{type:String}
    //date
});

const CommentModel = mongoose.model("comments", CommentSchema);

export const getCommentsByBlog = (blogId:String)=> CommentModel.find({blogId:blogId});
export const getBlogCommentById = (cId:String)=> CommentModel.findById(cId);
export const createComment = (values:Record<string,any>)=> new CommentModel(values)
    .save().then((comment)=> comment.toObject());
export const deleteComment = (id:String)=> CommentModel.findByIdAndDelete(id);