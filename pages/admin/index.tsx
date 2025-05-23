import { useState } from 'react';

const initialCars = [
  {
    id: 1,
    title: "Renault Sandero Stepway",
    price: "$11 500",
    year: 2020,
    mileage: "89 000 км",
    engine: "1.5л Дизель",
    status: "active"
  },
  // ... інші авто
];

export default function AdminDashboard() {
  const [cars, setCars] = useState(initialCars);
  const [newCar, setNewCar] = useState({ title: '', price: '', year: '', mileage: '', engine: '' });

  const addCar = () => {
    setCars([...cars, { ...newCar, id: Date.now(), status: "active" }]);
    setNewCar({ title: '', price: '', year: '', mileage: '', engine: '' });
  };

  const deleteCar = (id: number) => setCars(cars.filter(car => car.id !== id));

  const markAsSold = (id: number) => setCars(
    cars.map(car => car.id === id ? { ...car, status: "sold" } : car)
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8 px-2">
      <h1 className="text-3xl font-bold mb-6">Адмін-панель: Мої авто</h1>

      {/* Додавання нового авто */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <div className="flex gap-4 mb-2">
          <input
            className="bg-gray-800 rounded px-2 py-1 flex-1"
            value={newCar.title}
            onChange={e => setNewCar({ ...newCar, title: e.target.value })}
            placeholder="Назва авто"
          />
          <input
            className="bg-gray-800 rounded px-2 py-1 flex-1"
            value={newCar.price}
            onChange={e => setNewCar({ ...newCar, price: e.target.value })}
            placeholder="Ціна"
          />
          <input
            className="bg-gray-800 rounded px-2 py-1 flex-1"
            value={newCar.year}
            onChange={e => setNewCar({ ...newCar, year: e.target.value })}
            placeholder="Рік"
          />
          <input
            className="bg-gray-800 rounded px-2 py-1 flex-1"
            value={newCar.mileage}
            onChange={e => setNewCar({ ...newCar, mileage: e.target.value })}
            placeholder="Пробіг"
          />
          <input
            className="bg-gray-800 rounded px-2 py-1 flex-1"
            value={newCar.engine}
            onChange={e => setNewCar({ ...newCar, engine: e.target.value })}
            placeholder="Двигун"
          />
          <button onClick={addCar} className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white">Додати</button>
        </div>
      </div>

      {/* Таблиця авто */}
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Рік</th>
            <th>Пробіг</th>
            <th>Двигун</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id} className="bg-gray-900 rounded">
              <td>{car.title}</td>
              <td>{car.price}</td>
              <td>{car.year}</td>
              <td>{car.mileage}</td>
              <td>{car.engine}</td>
              <td>
                <span className={car.status === "sold" ? "text-red-400" : "text-green-400"}>
                  {car.status === "sold" ? "Продано" : "Активне"}
                </span>
              </td>
              <td>
                <button onClick={() => deleteCar(car.id)} className="text-red-400 hover:underline mr-2">Видалити</button>
                {car.status === "active" && (
                  <button onClick={() => markAsSold(car.id)} className="text-yellow-400 hover:underline">Позначити як продане</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

