// import React from 'react'

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full">
        <div className="logo font-bold text-white text-2xl ">
          <span className='text-green-700'> &lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
          
        </div>
        <div className="flex gap-1">
      Created with <img className="my-1" width={17}  src="icons/heart.png" alt="" /> by Sonav
        </div>
    </div>
  )
}

export default Footer
