'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const Theme = ({children}) => {
    const {theme,setTheme}=useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(()=>setMounted(true),[])
  return (
    <div className={theme}>
        <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-900 min-h-screen'>
            {children}
        </div>
    </div>
  )
}

export default Theme