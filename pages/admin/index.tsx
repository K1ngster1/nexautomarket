import { useEffect, useState } from "react";

const ALLOWED_IDS = [599020247]; // Твій Telegram user_id для доступу

export default function AdminAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Глобальна функція для Telegram
    (window as any).onTelegramAuth = function (userData: any) {
      if (ALLOWED_IDS.includes(userData.id)) {
        localStorage.setItem("tgUser", JSON.stringify(userData));
        setUser(userData);
      } else {
        alert("У вас немає доступу!");
      }
    };
  }, []);

  // Якщо вже авторизований
  useEffect(() => {
    const local = localStorage.getItem("tgUser");
    if (local) setUser(JSON.parse(local));
  }, []);

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>
          <div style={{ marginBottom: 20, textAlign: "center" }}>Авторизація в адмінці через Telegram</div>
          {/* Вставка Telegram Login Widget */}
          <script
            async
            src="https://telegram.org/js/telegram-widget.js?7"
            data-telegram-login="nexautobot"    // <-- Заміни на username свого бота без @
            data-size="large"
            data-userpic="false"
            data-radius="8"
            data-request-access="write"
            data-userpic="false"
            data-lang="uk"
            data-on-auth="onTelegramAuth"
          ></script>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Ви увійшли як {user.first_name} (id: {user.id})</h2>
      {/* Тут твоя адмінка */}
    </div>
  );
}
