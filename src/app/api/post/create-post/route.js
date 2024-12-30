
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
        const newPost=Post.create({
            userId:user.publicMetadata.userMongodbId,
            title:data.title,
            content:data.content,
            category:data.category,
            image:data.image,
            slug
        })
        await newPost.save()
        console.log("test",newPost)
        return new Response(JSON.stringify(newPost),{status:200})
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500})
    }
}