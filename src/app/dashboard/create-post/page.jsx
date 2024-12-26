'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const CreatePost = () => {
    const {isSignedIn,user,isLoaded}=useUser()
    console.log("Ashok",user)
    if(!isLoaded){
        return null
    }
    if(isSignedIn && user.publicMetadata.isAdmin){
        return (
            <div>CreatePost</div>
          )
    }
    else{
        return <h1 className='text-center text-3xl my-7 font-semibold'>You are not authorized to view this page</h1>
    }
  
}

export default CreatePost