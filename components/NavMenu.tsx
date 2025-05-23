// components/NavMenu.tsx
export default function NavMenu() {
  const buttons = [
    { label: '📋 Каталог авто', action: '/catalog' },
    { label: '🚚 Авто в дорозі', action: '/in-transit' },
    { label: '🔍 Пошук авто', action: '/search' },
    { label: '📝 Замовити авто', action: '/order' },
  ]

  return (
    <div className="grid gap-4 p-6">
      {buttons.map((btn, index) => (
        <a
          key={index}
          href={btn.action}
          className="block bg-zinc-800 rounded-xl py-4 text-center hover:bg-zinc-700 transition"
        >
          {btn.label}
        </a>
      ))}
    </div>
  )
}
