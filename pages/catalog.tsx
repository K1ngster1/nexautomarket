import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

type Car = {
  id: number;
  name: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  description: string;
};

export default function Catalog() {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    supabase
      .from('cars')
      .select('*')
      .then(({ data }) => {
        if (data) setCars(data)
      })
  }, [])

  return (
    <div style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: "24px 8px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
      gap: "18px"
    }}>
      {cars.map(car => (
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
            src={car.image}
            alt={car.name}
            style={{ width: "100%", height: 180, objectFit: "cover" }}
          />
          <div style={{ padding: 16 }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 22 }}>{car.name}</h3>
            <div style={{ fontSize: 16, marginBottom: 4 }}>
              <b>Рік:</b> {car.year} &nbsp; <b>Пробіг:</b> {car.mileage.toLocaleString()} км
            </div>
            <div style={{ fontSize: 16, marginBottom: 10 }}>
              <b>Ціна:</b> ${car.price.toLocaleString()}
            </div>
            <div style={{ color: "#cfcfcf", fontSize: 15 }}>{car.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
