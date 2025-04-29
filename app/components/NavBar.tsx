"use client"
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import {  useRouter } from 'next/navigation'
import React from 'react'

const NavBar = () => {
  const {isAuthenticated,logout} = useAuth();
  const router = useRouter();
  return (
    <div className='h-[10vh] flex items-center justify-between px-8'>
        <h1 className='font-bold text-4xl text-blue-800 align-baseline cursor-pointer' onClick={()=>router.push("/")}>
          OneAI
        </h1>
        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            <button className=' bg-blue-700 text-white w-20 h-8 rounded-lg' onClick={()=>logout()}>Logout</button>
          ) : (
            <>
            <Link href="signup"><button className=' bg-blue-700 text-white w-20 h-8 rounded-lg'>Signup</button></Link>
            <Link href="login"><button className=' bg-blue-700 text-white w-20 h-8 rounded-lg'>Login</button></Link>
            </>
          )}
          <>
          </>
        
        </div>
    </div>
  )
}

export default NavBar