'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

type CookieWatcherProps = {
  cookieName: string
  interval?: number
}

function useCookieWatcher({ cookieName, interval = 1000 }: CookieWatcherProps) {
  const router = useRouter()
  const lastValue = useRef<string | null>(null)

  useEffect(() => {
    const checkCookie = () => {
      const cookies = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${cookieName}=`))
      const value = cookies ? cookies.split('=')[1] : null

      if (lastValue.current !== null && lastValue.current !== value) {
        router.refresh()
      }

      lastValue.current = value
    }

    checkCookie()
    const id = setInterval(checkCookie, interval)
    return () => clearInterval(id)
  }, [cookieName, interval, router])
}

// ✅ Wrapper component that calls the hook
export function CookieWatcher() {
  useCookieWatcher({ cookieName: "view", interval: 1000 })
  return null
}
