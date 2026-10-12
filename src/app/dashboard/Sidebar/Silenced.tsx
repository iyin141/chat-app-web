import Image from 'next/image'
import React from 'react'
import silenced from '../../img/silenced.svg'

const Silenced = () => {
  return (
    <div className='pl-4 pr-5 pt-[10px] pb-2 flex justify-between items-center'>
          <div className='flex gap-3'>
              <Image src={silenced} alt="silenced" />
              <h1 className='text-[#E9EDEF]'>Silenced</h1>
          </div>
          
    </div>
  )
}

export default Silenced
