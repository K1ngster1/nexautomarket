import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#15161a] via-[#242632] to-[#35374d] text-white relative overflow-hidden">
      <div className="relative z-20 w-full max-w-xs sm:max-w-md flex flex-col items-center p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md">
        <img
          src="/logo.png"
          alt="NexAuto"
          className="w-20 h-20 object-contain mb-6 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
        />
        <h1 className="text-3xl font-black mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
          Автомайданчик у смартфоні
        </h1>
        <p className="text-base text-center opacity-70 mb-8">Перший сучасний онлайн-майданчик для авто у м.Чернігів</p>
        <Link href="/cars">
          <button className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all duration-200 active:scale-95">
            Переглянути авто
          </button>
        </Link>
        <div className="mt-8 text-xs opacity-60 text-center">
          м.Чернігів, вул. Любецька 70 <br />
          <a href="tel:+380xxxxxxxxx" className="underline opacity-70 hover:opacity-100 transition">Зателефонувати</a>
        </div>
      </div>
    </div>
  );
}
