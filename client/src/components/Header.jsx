import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-fuchsia-100 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
       <Link  to="/">
       <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-red-600'>Youtube</span>
        <span className='text-red-800'>Analytic</span>
       </h1>      
       </Link>
      <form className=' flex bg-fuchsia-50 p-3 rounded-lg items-center '>
        <input type='text' placeholder='search....' className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <FaSearch className='text-slate-500' />
      </form>
      <ul className='flex gap-4'>
        <Link to="/sign-in">
          <li className='hidden sm:inline text-red-500 hover:underline'>Signin</li>
        </Link>
        <Link to="/sign-up">
          
          <li className='hidden sm:inline text-red-500 hover:underline'>Signup</li>
        </Link>
      </ul>
     </div>
    </header>
  )
}
