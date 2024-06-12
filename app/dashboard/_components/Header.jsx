"use client"
import React from 'react'
import logo from '@/public/logo.svg'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
const Header = () => {

    const path=usePathname();

  return (
    <div className='shadow-md h-[70px] w-full flex justify-between px-7 items-center bg-secondary '>
     
      <Image src={logo} alt='logo' width={100} height={100} />

      <ul className=' gap-6 hidden md:flex lg:flex'>
        <li className={` ${path =='/dashboard' && 'text-primary font-bold'} hover:text-primary hover:font-bold`}>Dashboard</li>
         <li className={` ${path =='dashboard/questions' && 'text-primary font-bold'} hover:text-primary hover:font-bold`}>Questions</li>
         <li className={` ${path =='dashboard/upgrade' && 'text-primary font-bold'} hover:text-primary hover:font-bold`}>Upgarde</li>
         <li className={` ${path =='dashboard/works' && 'text-primary font-bold'} hover:text-primary hover:font-bold`}>How it works?</li>


      </ul>
      <UserButton />
    </div>
  )
}

export default Header
