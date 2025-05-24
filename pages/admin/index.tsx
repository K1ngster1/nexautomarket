import { useEffect, useState } from "react";
import { allowedAdmins } from "../../lib/allowedAdmins";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Читати з localStorage/куки якщо вже авторизовано
    const data = localStorage.getItem("tgUser");
    if (data) setUser(JSON.parse(data));
    // eslint-disable-next-line
  }, []);

  // Коли Telegram повертає дані
  useEffect(() => {
    // Шукаємо у window
    // eslint-disable-next-line
    if (window.TelegramLoginWidget) {
      // можна обробляти тут, якщо треба
    }
    // eslint-disable-next-line
    window.onTelegramAuth = function (userData) {
      localStorage.setItem("tgUser", JSON.stringify(userData));
      setUser(userData);
    };
  }, []);

  // Якщо не авторизовано
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="mb-6 text-xl">Авторизація в адмінці через Telegram</h2>
        <script async src="https://telegram.org/js/telegram-widget.js?7"
          data-telegram-login="YOUR_BOT_USERNAME" // <-- заміни на свого бота!
          data-size="large"
          data-userpic="false"
          data-request-access="write"
          data-userpic="false"
          data-onauth="onTelegramAuth(user)"
        />
      </div>
    );
  }

  // Якщо користувач НЕ дозволений
  if (!allowedAdmins.includes(Number(user.id))) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-red-600">Доступ заборонено</h2>
        <button onClick={() => { localStorage.removeItem("tgUser"); setUser(null); }} className="mt-4 underline">Вийти</button>
      </div>
    );
  }

  // ТУТ — твоя справжня адмінка (контент)
  return (
    <div>
      <h2 className="text-xl mb-4">Вітаємо, {user.first_name}! Це адмінка 🚀</h2>
      <button onClick={() => { localStorage.removeItem("tgUser"); setUser(null); }} className="underline mb-8">Вийти</button>
      {/* Адмін-функції тут */}
    </div>
  );
}
