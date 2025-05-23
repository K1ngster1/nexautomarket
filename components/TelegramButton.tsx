export default function TelegramButton() {
  return (
    <a
      href="https://t.me/yourtelegramusername" // заміни на свій!
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 px-5 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 block text-center"
    >
      Написати власнику у Telegram
    </a>
  );
}
