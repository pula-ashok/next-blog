'use client'
import { useUser } from '@clerk/nextjs'
import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import dynamic from 'next/dynamic'
import React from 'react'

const ReactQuill=dynamic(()=>import('react-quill-new'),{ssr:false})
import "react-quill-new/dist/quill.snow.css";
const CreatePost = () => {
    const {isSignedIn,user,isLoaded}=useUser()
    console.log("Ashok",user)
    if(!isLoaded){
        return null
    }
    if(isSignedIn && user.publicMetadata.isAdmin){
        return (
            <div className='bg-pink-100 max-w-3xl mx-auto min-h-screen p-3'>
                <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
                <form action="" className='flex flex-col gap-4'>
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <TextInput type='text' placeholder="Title" id='title' className="flex-1"/>
                        <Select>
                            <option value="uncategorized">Select a category</option>
                            <option value="javascript">Javascript</option>
                            <option value="reactjs">React.js</option>
                            <option value="nextjs">Next.js</option>
                        </Select>
                    </div>
                    <div className=" flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                        <FileInput type='file' accept="image/*"/>
                        <Button type='button' size='sm' outline gradientDuoTone='purpleToBlue'>Upload a Image</Button>
                    </div>
                    <ReactQuill theme='snow' className='h-72 mb-12' placeholder='Write something...' required/>
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