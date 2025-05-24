import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'
import type { Car } from '../types/Car'

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    supabase
      .from('cars')
      .select('*')
      .then(({ data }) => {
        if (data) setCars(data as Car[])
      })
  }, [])

  return (
    <div>
      {/* Стартова секція */}
      <div style={{
        margin: "0 auto",
        marginTop: 30,
        marginBottom: 32,
        maxWidth: 350,
        background: "rgba(38,39,55,0.97)",
        borderRadius: 24,
        padding: "32px 18px 24px",
        boxShadow: "0 4px 30px 0 rgba(0,0,0,0.27)",
        textAlign: "center"
      }}>
        {/* Заміни шлях до логотипу на свій або прибери зовсім */}
        {/* <img src="/nexauto_logo.png" width={70} height={70} style={{borderRadius: 16, margin: "0 auto 12px"}} /> */}
        <h2 style={{fontWeight:700, fontSize:28, background: "linear-gradient(90deg,#b286fd,#50e3c2)", WebkitBackgroundClip:"text", color:"transparent", marginBottom: 8}}>
          Автомайданчик<br/>у смартфоні
        </h2>
        <div style={{color:"#cfcfcf", fontSize:17, marginBottom:18}}>
          Перший сучасний онлайн-майданчик для авто у м.Чернігів
        </div>
        <a href="#catalog" style={{
          display:"inline-block",
          fontWeight:600,
          background: "linear-gradient(90deg,#b286fd,#50e3c2)",
          color: "#fff",
          padding: "10px 28px",
          borderRadius: 8,
          textDecoration: "none",
          marginBottom: 12
        }}>Переглянути авто</a>
        <div style={{fontSize:13, color:"#d5d5d5", marginTop:16}}>
          м.Чернігів, вул. Любечська 70<br/>
          <a href="tel:+380930000000" style={{color:"#b286fd", textDecoration:"underline"}}>Зателефонувати</a>
        </div>
      </div>

      {/* Каталог авто */}
      <div id="catalog" style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "24px 8px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: "18px"
      }}>
        {cars.length === 0 ? (
          <div style={{color: "#888", gridColumn: "1/-1", textAlign: "center"}}>Авто наразі немає</div>
        ) : (
          cars.map(car => (
            <div key={car.id} style={{
              background: "rgba(36, 37, 42, 0.98)",
              borderRadius: 18,
              boxShadow: "0 2px 16px rgba(50,50,70,0.13)",
              overflow: "hidden",
              color: "#fff",
              display: "flex",
              flexDirection: "column"
            }}>
              <img
                src={car.images?.split(',')[0] || "https://via.placeholder.com/320x180?text=No+Image"}
                alt={car.title}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 22 }}>{car.title}</h3>
                <div style={{ fontSize: 16, marginBottom: 4 }}>
                  <b>Рік:</b> {car.year} &nbsp; <b>Пробіг:</b> {car.mileage?.toLocaleString()} км
                </div>
                <div style={{ fontSize: 16, marginBottom: 10 }}>
                  <b>Ціна:</b> ${car.price?.toLocaleString()}
                </div>
                <div style={{ color: "#cfcfcf", fontSize: 15 }}>{car.description}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
