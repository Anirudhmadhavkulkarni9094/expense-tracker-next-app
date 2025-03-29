'use client'
import Button from '@/components/Button/Button'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
     <Button borderRadius={10} color="red" onClick={()=>{console.log("hello")}}></Button>
    </div>
  )
}

export default page