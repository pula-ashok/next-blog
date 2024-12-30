import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    title:{type:String,required:true}, 
    content:{type:String,required:true}, 
    category:{type:String,default:"uncategorized"},
    image:{type:String,default:"https://cdn.britannica.com/48/252748-050-C514EFDB/Virat-Kohli-India-celebrates-50th-century-Cricket-November-15-2023.jpg"},
    slug:{type:Date,required:true,unique:true},
},{timestamps:true})

const Post=mongoose.models.Post || mongoose.model("Post",postSchema)

export default Post