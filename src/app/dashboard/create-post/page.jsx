'use client'
import { useUser } from '@clerk/nextjs'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import dynamic from 'next/dynamic'
const ReactQuill=dynamic(()=>import('react-quill-new'),{ssr:false})
import "react-quill-new/dist/quill.snow.css";
import React, { useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '@/firebase'
import { useRouter } from 'next/navigation'
// import 'react-circular-progressbar/dist/styles.css';
// import { CircularProgressbar } from 'react-circular-progressbar'
const CreatePost = () => {
    const {isSignedIn,user,isLoaded}=useUser()
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({title:'',content:'',image:'',category:''})
    const [publishError, setPublishError] = useState(null)
    const router=useRouter()
    const fileRef=useRef()
    console.log(formData)
    console.log(user,"shiva")
    const handleImageUpload=async()=>{
        console.log("ashok")
        try {
            console.log(file)
            if(!file){
                setImageUploadError("Please select a file");
                return;
            }
            setImageUploadError(null);
            const storage=getStorage(app)
            const fileName=new Date().getTime()+'-'+file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file)
            uploadTask.on('state_changed',
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setImageUploadError("Image upload failed");
                    setImageUploadProgress(null);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
                        setFormData({...formData,image:downloadURL})
                        setImageUploadError(null);
                        setImageUploadProgress(null);
                        setFile(null)
                        fileRef.current.value=''
                    })
                    }                
            )
        } catch (error) {
            setImageUploadError("Image upload failed");
            setImageUploadProgress(null);
            console.log(error)
        }
    }
    const publishHandler=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetch('/api/post/create-post',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({...formData,userMongodbId:user.publicMetadata.userMongodbId||null})
            })
            const data=await response.json()
            if(!res.ok){
                setPublishError(data.message)
            }
            if(res.ok){
                setPublishError(null)
                setFormData({title:'',content:'',image:'',category:''})
                router.push(`/post/${data.slug}`)
            }
            console.log(formData)
            
        } catch (error) {
            console.log(error)
            setPublishError('Something went wrong')
        }
    }
    if(!isLoaded){
        return null
    }
    if(isSignedIn && !user.publicMetadata.isAdmin){
        return (
            <div className='max-w-3xl mx-auto min-h-screen p-3'>
                <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
                <form action="" className='flex flex-col gap-4' onSubmit={publishHandler}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <TextInput type='text' placeholder="Title" id='title' className="flex-1" value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})}/>
                        <Select value={formData.category} onChange={e=>setFormData({...formData,category:e.target.value})}>
                            <option value="uncategorized">Select a category</option>
                            <option value="javascript">Javascript</option>
                            <option value="reactjs">React.js</option>
                            <option value="nextjs">Next.js</option>
                        </Select>
                    </div>
                    <div className=" flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                        <FileInput type='file' accept="image/*" ref={fileRef} onChange={e=>{setFile(e.target.files[0]);setImageUploadError(null)}}/>
                        <Button type='button' size='sm' outline gradientDuoTone='purpleToBlue' disabled={imageUploadError} onClick={handleImageUpload}>
                            {/* {imageUploadProgress ? <div className='w-16 h-16'>
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            </div> : 'Upload a Image'} */}
                            Upload a Image
                        </Button>
                    </div>
                    {
                        imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
                    }
                    {
                        formData?.image && (<img src={formData.image} alt='image' className='w-full h-72 object-cover'/>)
                    }
                    <ReactQuill theme='snow' className='h-72 mb-12' placeholder='Write something...' required value={formData.content} onChange={value=>setFormData({...formData,content:value})}/>
                    <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
                </form>
            </div>
          )
    }
    else{
        return <h1 className='text-center text-3xl my-7 font-semibold'>You are not authorized to view this page</h1>
    }
  
}

export default CreatePost