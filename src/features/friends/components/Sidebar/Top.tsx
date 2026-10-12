'use client'
import React from 'react'
import { Montserrat } from 'next/font/google'
import Tabs from '@/app/dashboard/components/navbar/Options'

import Filter from '../AddFriends/Search'
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil} from 'lucide-react'
import { useThemeStore } from '@/components/Theme'


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose your weights
  display: 'swap',
})


const Top = () => {

   const router = useRouter();
  const searchParams = useSearchParams();
 const { isDark } = useThemeStore();
 

    const updateView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`); // updates URL and triggers new server render
  };

  return (
    <div className={`${montserrat.className}  flex flex-col border-r   p-5 pb-0`}
    style={{
        backgroundColor: isDark ? "#000" : "#fff",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
      }}
    >
    <div className="flex items-center justify-between mb-5 pt-1">
          <h1
            className="text-[1.8rem] font-semibold "
            style={{ color: isDark ? "#fff" : "#000" }}
          >
            Messages
          </h1>
          <button
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: isDark ? "transparent" : "transparent",
              color: isDark ? "#fff" : "#000",
          }}
          onClick={() => updateView("Friends")}
          >
         
            <Pencil className="w-5 h-5" />
            
          </button>
        </div>
      
      <div className=''>
        <Filter placeholder="Search or start new chat" type={2} />
      </div>

      <div>
        <Tabs />
      </div>
      
    </div>
  )
}

export default Top
