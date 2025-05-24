import { useEffect, useState } from "react";
import { allowedAdmins } from "../../lib/allowedAdmins";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("tgUser");
    if (data) setUser(JSON.parse(data));
  }, []);

  useEffect(() => {
    // TelegramLoginWidget НЕ потрібен!
    // eslint-disable-next-line
    window.onTelegramAuth = function (userData: any) {
      localStorage.setItem("tgUser", JSON.stringify(userData));
      setUser(userData);
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="mb-6 text-xl">Авторизація в адмінці через Telegram</h2>
        <script async src="https://telegram.org/js/telegram-widget.js?7"
          data-telegram-login="YOUR_BOT_USERNAME" // <-- заміни на свого бота!
          data-size="large"
          data-userpic="false"
          data-request-access="write"
          data-onauth="onTelegramAuth(user)"
        />
      </div>
    );
  }

  if (!allowedAdmins.includes(Number(user.id))) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-red-600">Доступ заборонено</h2>
        <button onClick={() => { localStorage.removeItem("tgUser"); setUser(null); }} className="mt-4 underline">Вийти</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Вітаємо, {user.first_name}! Це адмінка 🚀</h2>
      <button onClick={() => { localStorage.removeItem("tgUser"); setUser(null); }} className="underline mb-8">Вийти</button>
      {/* Тут твоя адмінка */}
    </div>
  );
}
