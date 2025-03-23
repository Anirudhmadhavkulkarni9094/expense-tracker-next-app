import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-around px-2 py-4 bg-gray-800 text-white sticky top-0'>
        <div>Logo</div>
        <ul className='flex gap-10'>
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/settings"}>Settings</Link>
        </ul>
    </div>
  )
}

export default Navbar