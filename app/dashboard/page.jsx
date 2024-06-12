"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import AddNewInterview from './_components/AddNewInterview'

const page = () => {

  
  return (
    <div>
      <h1 className='font-bold text-2xl'>Dashboard</h1>
      <p className='text-gray-500'>Create and start your mockup interview</p>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>
    </div>
  )
}

export default page
