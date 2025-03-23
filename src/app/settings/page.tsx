import BudgetEditor from '@/components/BudgetEditor/BudgetEditor'
import ProfileBudget from '@/components/ProfileCard/ProfileBudget'
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
function page() {
  return (
    <div className='text-white p-5'>
        <div className='flex gap-10'>

       <ProfileCard
        name="Anirudh Kulkarni"
        email="Anirudh.Kulkarni@brillio.com"
        role="Software Engineer"
        company="Brillio"
        location="Bangalore, India"
        contact="+91 98765 43210"
        profilePic="https://picsum.photos/200"
      />
      <ProfileBudget/>
     
        </div>
      <BudgetEditor />
    </div>
  )
}

export default page