
import Post from '@/lib/models/Post';
import { currentUser } from '@clerk/nextjs/server';
export const POST=async(req)=>{
    const user=await currentUser()
    try {
        const data=await req.json()
        console.log(data,"test")
        if(!user ||user.publicMetadata.userMongoId !==data.userMongodbId || user.publicMetadata.isAdmin !==true){
            return new Response('Unauthorized',{status:401})            
        }
        const slug=data.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g)
        const newPost = await Post.create({
            userId: user.publicMetadata.userMongoId,
            content: data.content,
            title: data.title,
            image: data.image,
            category: data.category,
            slug,
          });
          await newPost.save();
        console.log("test",newPost)
        return new Response(JSON.stringify(newPost),{status:200})
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500})
    }
}