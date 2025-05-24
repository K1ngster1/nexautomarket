import { useState } from "react";

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "nexauto2025"; // Задай свій пароль

export default function Admin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setAccess(true);
    } else {
      alert("Невірний логін або пароль!");
    }
  };

  if (!access) {
    return (
      <form
        onSubmit={handleSubmit}
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h2>Вхід в адмінку</h2>
        <input
          type="text"
          placeholder="Логін"
          value={login}
          onChange={e => setLogin(e.target.value)}
          style={{ margin: "10px 0", fontSize: 18, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ margin: "10px 0", fontSize: 18, padding: 8 }}
        />
        <button type="submit" style={{ fontSize: 16, padding: "6px 20px" }}>
          Увійти
        </button>
      </form>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Ласкаво просимо в адмінку!</h1>
      {/* Тут розміщуй функціонал адмінки */}
    </div>
  );
}
