// pages/home.tsx
import NavMenu from '../components/NavMenu'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="p-6 text-center">
        <h1 className="text-3xl font-semibold">Головне меню</h1>
      </div>
      <NavMenu />
    </div>
  )
}
