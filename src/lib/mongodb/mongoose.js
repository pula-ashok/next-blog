import mongoose from 'mongoose'

export const connectDB=async()=>{
    let initialized=false;
    mongoose.set('strictQuery', false);
    if(initialized){
        console.log("Already mongodb connected");
    }
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:'nextjs-blog',
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Connected to mongodb');
        initialized=true
    } catch (error) {
        console.log('mongodb connection error',error);
    }
}