import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{type:String,required:true,unique},
    title:{type:String,required:true}, 
    content:{type:String,required:true}, 
    category:{type:String,default:"uncategorized"},
    image:{type:Date,default:""},
    slug:{type:Date,required:true,unique:true},
},{timestamps:true})

const Post=mongoose.models.Post || mongoose.model("Post",postSchema)

export default Post