export default function Home() {
  return (
    <div>
      {/* Логотип великий зверху */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 0 }}>
        <img
          src="/logo.png"
          alt="NexAutoMarket"
          width={160}
          height={160}
          style={{
            borderRadius: 22,
            boxShadow: "0 8px 36px rgba(0,0,0,0.13)",
            objectFit: "cover",
            background: "#232334"
          }}
        />
      </div>

      {/* Презентаційна секція */}
      <div style={{
        margin: "0 auto",
        marginTop: 10,
        marginBottom: 32,
        maxWidth: 350,
        background: "rgba(38,39,55,0.97)",
        borderRadius: 24,
        padding: "32px 18px 24px",
        boxShadow: "0 4px 30px 0 rgba(0,0,0,0.27)",
        textAlign: "center"
      }}>
        <h2 style={{
          fontWeight: 700,
          fontSize: 28,
          background: "linear-gradient(90deg,#b286fd,#50e3c2)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: 8
        }}>
          Автомайданчик<br />у смартфоні
        </h2>
        <div style={{ color: "#cfcfcf", fontSize: 17, marginBottom: 18 }}>
          Перший сучасний онлайн-майданчик для авто у м.Чернігів
        </div>
        <a href="/catalog" style={{
          display: "inline-block",
          fontWeight: 600,
          background: "linear-gradient(90deg,#b286fd,#50e3c2)",
          color: "#fff",
          padding: "10px 28px",
          borderRadius: 8,
          textDecoration: "none",
          marginBottom: 12
        }}>Переглянути авто</a>
        <div style={{ fontSize: 13, color: "#d5d5d5", marginTop: 16 }}>
          м.Чернігів, вул. Любечська 70<br />
          <a href="tel:+380930000000" style={{ color: "#b286fd", textDecoration: "underline" }}>Зателефонувати</a>
        </div>
      </div>
    </div>
  )
}
