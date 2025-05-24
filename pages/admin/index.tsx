import { useEffect, useState } from "react";

const ADMIN_IDS = [599020247]; // Твій Telegram user_id

export default function Admin() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!(window as any).TelegramLoginWidgetInjected) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?7";
      script.setAttribute("data-telegram-login", "NexAutoMarketBot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "8");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-userpic", "false");
      script.setAttribute("data-lang", "uk");
      script.setAttribute("data-on-auth", "onTelegramAuth");
      script.async = true;
      document.getElementById("telegram-login")?.appendChild(script);
      (window as any).TelegramLoginWidgetInjected = true;
    }

    (window as any).onTelegramAuth = function (userData: any) {
      localStorage.setItem("tgUser", JSON.stringify(userData));
      setUser(userData);
    };

    const localUser = localStorage.getItem("tgUser");
    if (localUser) setUser(JSON.parse(localUser));
  }, []);

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

  return (
    <div>
      <h1>Ласкаво просимо в адмінку, {user.first_name}</h1>
      {/* Контент адмінки */}
    </div>
  );
}
