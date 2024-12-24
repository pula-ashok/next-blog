'use client'
import { Button, Navbar, TextInput } from 'flowbite-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'

const Header = () => {
    const path=usePathname()
    const {theme,setTheme}=useTheme()
  return (
    <Navbar className='border-b-2'>
      <Link href={"/"} className='text-sm sm:text-xl font-semibold self-center whitespace-nowrap'>
        <span className='px-2 py-1 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg'>Ashok's</span>Blog
      </Link>
      <form action="">
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray'>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className='w-12 h-10 hidden sm:inline' color='gray' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
         {theme==='light'?<FaMoon/>:<FaSun/>}
        </Button>
        <Link href={'/sign-in'}>
        <Button gradientDuoTone="purpleToBlue" outline>
          Sign In
        </Button>
        </Link>        
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href={"/"}>
          <Navbar.Link active={path === "/"} as="div">
            Home
          </Navbar.Link>
        </Link>
        <Link href={"/about"}>
          <Navbar.Link active={path === "/about"} as="div">
            About
          </Navbar.Link>
        </Link>
        <Link href={"/projects"}>
          <Navbar.Link active={path === "/projects"} as="div">
            Projects
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header