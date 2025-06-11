"use client"
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiLogOut, FiUser, FiUserPlus } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const NavBar = () => {
  const {isAuthenticated, logout} = useAuth();
  const router = useRouter();
  
  return (
    <nav className='h-[10vh] flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50'>
      <div 
        className='flex items-center gap-2 font-bold text-4xl cursor-pointer group'
        onClick={() => router.push("/")}
      >
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          OneAI
        </div>
        <HiSparkles className='text-yellow-500 group-hover:animate-spin transition-all duration-300' size={32} />
      </div>
      
      <div className='flex items-center gap-4'>
        {isAuthenticated ? (
          <button 
            className='flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
            onClick={() => logout()}
          >
            <FiLogOut size={16} />
            Logout
          </button>
        ) : (
          <div className='flex items-center gap-3'>
            <Link href="signup">
              <button className='flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                <FiUserPlus size={16} />
                Sign Up
              </button>
            </Link>
            <Link href="login">
              <button className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                <FiUser size={16} />
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar