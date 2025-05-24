import Script from "next/script";
import { useEffect, useState } from "react";

const ALLOWED_IDS = [599020247];

export default function AdminAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (window as any).onTelegramAuth = function (userData: any) {
      if (ALLOWED_IDS.includes(userData.id)) {
        localStorage.setItem("tgUser", JSON.stringify(userData));
        setUser(userData);
      } else {
        alert("У вас немає доступу!");
      }
    };
    const local = localStorage.getItem("tgUser");
    if (local) setUser(JSON.parse(local));
  }, []);

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            Авторизація в адмінці через Telegram
          </div>
          {/* Додаємо Telegram Login Widget через dangerouslySetInnerHTML */}
          <Script src="https://telegram.org/js/telegram-widget.js?7" strategy="afterInteractive" />
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <script async src="https://telegram.org/js/telegram-widget.js?7"
                  data-telegram-login="nexautobot"
                  data-size="large"
                  data-radius="8"
                  data-request-access="write"
                  data-userpic="false"
                  data-lang="uk"
                  data-on-auth="onTelegramAuth"></script>
              `,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Ви увійшли як {user.first_name} (id: {user.id})</h2>
      {/* Твоя адмінка */}
    </div>
  );
}
