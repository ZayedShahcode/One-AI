import React from 'react'

const NavBar = () => {
  return (
    <div className='h-[10vh] flex items-center justify-between px-8'>
        <h1 className='font-bold text-4xl text-blue-800 align-baseline'>OneAI</h1>
        <button className=' bg-blue-700 text-white w-20 h-8 rounded-lg'>Sign In</button>
    </div>
  )
}

export default NavBar