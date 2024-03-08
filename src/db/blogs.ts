import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    likes:{type:Array,default:[]},
    image:{type:Object},
});

export const BlogModel = mongoose.model('blog',BlogSchema);  //creating a blog document

export const getBlogs = ()=> BlogModel.find();
export const getBlogsByDate = ()=> BlogModel.findOne({date:String});
export const getBlogById = (id:string) => BlogModel.findById(id);
export const createBlog = (values: Record<string,any>)=> new BlogModel(values)
    .save().then((blog)=>blog.toObject());

export const deleteBlogById = (id:string) => BlogModel.findOneAndDelete({_id:id});
export const updateBlogById = (id:string,values:Record<string, any>) => BlogModel.findByIdAndUpdate(id,values);

