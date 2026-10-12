import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/components/Value'
import { useThemeStore } from '@/components/Theme'
import { Search } from 'lucide-react'



type shape = {
    item: string
}

type prop = {
 
  placeholder: string
 
  type:number
}


const Filter = ({ placeholder, type }: prop) => {
  

    const { register, watch } = useForm<shape>()
  const result = watch("item", "")
  const search = useAuthStore((s) => s.setsearch)
  const search_2 = useAuthStore((s) => s.setsearch_2)
   const { isDark } = useThemeStore();

    useEffect(() => {
      if(type === 1) {
        search(result)
      } else {
        search_2(result)
      }
}, [result])
    
  return (
      <div>
          <form action="" className="relative mb-6" >
             <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: isDark ? "#6b7280" : "#9ca3af" }}
          />
        <input type="text" placeholder={placeholder} {...register('item')} 
          className="w-full rounded-full pl-12 pr-4 py-3.5 outline-none text-sm border"
            style={{
              color: isDark ? "#fff" : "#000",
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
              backdropFilter: "blur(10px)",
            }}
        />

          </form>

    </div>
  )
}

export default Filter
