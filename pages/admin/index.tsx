import React, { useState } from "react";

// Тип машини
type Car = {
  id: number;
  title: string;
  price: string;
  year: number;
  mileage: string;
  engine: string;
  status: string;
};

export default function AdminPage() {
  // Початковий масив машин (можна змінити на запит до бекенду)
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      title: "Renault Sandero Stepway",
      price: "$11 500",
      year: 2020,
      mileage: "89 000 км",
      engine: "1.5л Дизель",
      status: "active",
    },
  ]);

  // Стан форми для додавання машини
  const [newCar, setNewCar] = useState<Omit<Car, "id" | "status">>({
    title: "",
    price: "",
    year: new Date().getFullYear(),
    mileage: "",
    engine: "",
  });

  // Додає машину
  const addCar = () => {
    setCars([
      ...cars,
      { ...newCar, id: Date.now(), status: "active" },
    ]);
    setNewCar({
      title: "",
      price: "",
      year: new Date().getFullYear(),
      mileage: "",
      engine: "",
    });
  };

  // Видаляє машину
  const deleteCar = (id: number) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#22223b] via-[#383863] to-[#232536] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Адмін-панель</h1>
      <div className="bg-white/10 p-4 rounded-xl mb-10 shadow-lg max-w-xl">
        <h2 className="text-xl font-bold mb-3">Додати авто</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Марка/Модель"
            className="p-2 rounded bg-white/20 text-white"
            value={newCar.title}
            onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ціна"
            className="p-2 rounded bg-white/20 text-white"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Рік"
            className="p-2 rounded bg-white/20 text-white"
            value={newCar.year}
            onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Пробіг"
            className="p-2 rounded bg-white/20 text-white"
            value={newCar.mileage}
            onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })}
          />
          <input
            type="text"
            placeholder="Двигун"
            className="p-2 rounded bg-white/20 text-white"
            value={newCar.engine}
            onChange={(e) => setNewCar({ ...newCar, engine: e.target.value })}
          />
        </div>
        <button
          className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded shadow"
          onClick={addCar}
        >
          Додати авто
        </button>
      </div>

      <h2 className="text-xl font-bold mb-3">Список авто</h2>
      <div className="grid gap-4 max-w-xl">
        {cars.map((car) => (
          <div
            key={car.id}
            className="flex justify-between items-center bg-white/10 rounded-xl p-4 shadow"
          >
            <div>
              <div className="font-bold">{car.title} ({car.year})</div>
              <div>Ціна: {car.price}</div>
              <div>Пробіг: {car.mileage}</div>
              <div>Двигун: {car.engine}</div>
              <div className="text-xs text-gray-300">Статус: {car.status}</div>
            </div>
            <button
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              onClick={() => deleteCar(car.id)}
            >
              Видалити
            </button>
          </div>
        ))}
        {cars.length === 0 && <div className="text-gray-400">Авто немає</div>}
      </div>
    </div>
  );
}
