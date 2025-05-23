// pages/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4 animate-pulse">🚗 NexAutoMarket</h1>
        <p className="text-lg">Завантаження застосунку...</p>
      </div>
    </div>
  )
}
