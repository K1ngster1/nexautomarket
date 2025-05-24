import { useEffect, useState } from "react";

const ADMIN_IDS = [599020247]; // Додай сюди свої Telegram user_id

export default function Admin() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Додаємо Telegram Login Widget
    if (!window.TelegramLoginWidgetInjected) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?7";
      script.setAttribute("data-telegram-login", "NexAutoMarketBot"); // <-- ТУТ ІМ'Я ТВОГО БОТА!
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "8");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-userpic", "false");
      script.setAttribute("data-lang", "uk");
      script.setAttribute("data-on-auth", "onTelegramAuth");
      script.async = true;
      document.getElementById("telegram-login")?.appendChild(script);

      // Позначаємо, що вже вставили
      (window as any).TelegramLoginWidgetInjected = true;
    }

    // Глобальна функція для отримання даних після авторизації
    (window as any).onTelegramAuth = function (userData: any) {
      localStorage.setItem("tgUser", JSON.stringify(userData));
      setUser(userData);
    };

    // Якщо вже є userData в localStorage
    const localUser = localStorage.getItem("tgUser");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  // --- Перевірка доступу ---
  if (!user)
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div>Авторизація в адмінці через Telegram</div>
        <div id="telegram-login" style={{ marginTop: 20 }} />
      </div>
    );

  if (!ADMIN_IDS.includes(user.id)) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        У вас немає доступу
      </div>
    );
  }

  // Далі твоя адмінка...
  return (
    <div>
      {/* Контент адмінки */}
      <h1>Ласкаво просимо в адмінку, {user.first_name}</h1>
      {/* ... */}
    </div>
  );
}
