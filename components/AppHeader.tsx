import Image from "next/image";

export default function AppHeader() {
  return (
    <header className="w-full flex items-center justify-center py-4 bg-black/50 shadow-md">
      <Image src="/logo.png" alt="NexAuto" width={40} height={40} className="rounded-xl" />
      <span className="ml-4 text-xl font-bold text-white tracking-wide drop-shadow">NexAutoMarket</span>
    </header>
  );
}
