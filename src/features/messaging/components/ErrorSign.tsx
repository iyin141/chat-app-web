'use client'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from '@/components/Value';



const Error_sign = () => {
  const status = useAuthStore((s) => s.status)
  const setstatus = useAuthStore((s) => s.setstatus)
  return (
    <div className={`${status ? "self-center bg-red-600 w-[220px] rounded-[5px] pl-2 pr-1 pt-2 pb-2 text-center text-white flex  items-center justify-center leading-none" : 'hidden'}`}>
      <span className='font-light text-[#e7e5e5]'>{status}</span>
      <button onClick={() => setstatus('')}>
         <CloseIcon fontSize="small" className='self-end ml-auto' />
         </button>
  
</div>

  )
}

export default Error_sign
