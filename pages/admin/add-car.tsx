import React, { useState } from "react";

const initialFeatures = [
  "Протитуманні фари", "Круїз контроль", "ESP", "Автомагнітола", "Кондиціонер",
  "Підсилювач керма", "ABS", "Легкосплавні диски", "Центральний замок", "Паркотронік",
  "Тонування", "Електрозеркала", "Підігрів сидінь", "Задня камера", "Склопідйомники"
];

export default function AddCarForm() {
  const [car, setCar] = useState({
    brand: "", model: "", year: "", mileage: "",
    vin: "", engine: "", fuel: "Бензин", transmission: "",
    drive: "", color: "", price: "", features: [], photos: [],
  });

  // Додаємо обробник для чекбоксів опцій
  const handleFeature = (feature) => {
    setCar((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  // Завантаження фото
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setCar((prev) => ({ ...prev, photos: files }));
  };

  // Відправка форми (демо)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (car.photos.length < 5) {
      alert("Завантажте мінімум 5 фото");
      return;
    }
    // TODO: Відправка даних на сервер/API
    console.log(car);
    alert("Авто додано (у консолі)");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white/10 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Основна інформація</h2>
      {/* Поля форми */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input placeholder="Виробник" value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })} className="p-2 rounded bg-white/20" />
        <input placeholder="Модель" value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} className="p-2 rounded bg-white/20" />
        <input placeholder="Рік" value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} className="p-2 rounded bg-white/20" />
        <input placeholder="Пробіг" value={car.mileage} onChange={e => setCar({ ...car, mileage: e.target.value })} className="p-2 rounded bg-white/20" />
        <input placeholder="VIN-код" value={car.vin} onChange={e => setCar({ ...car, vin: e.target.value })} className="p-2 rounded bg-white/20" />
        <input placeholder="Обʼєм двигуна (л)" value={car.engine} onChange={e => setCar({ ...car, engine: e.target.value })} className="p-2 rounded bg-white/20" />
        <input placeholder="Колір" value={car.color} onChange={e => setCar({ ...car, color: e.target.value })} className="p-2 rounded bg-white/20" />
        <input placeholder="Ціна (USD)" value={car.price} onChange={e => setCar({ ...car, price: e.target.value })} className="p-2 rounded bg-white/20" />
      </div>

      {/* Селект/радіо для пального, коробки, приводу */}
      <div className="mb-4">
        <select value={car.fuel} onChange={e => setCar({ ...car, fuel: e.target.value })} className="p-2 rounded bg-white/20 mr-2">
          <option>Бензин</option>
          <option>Дизель</option>
          <option>Газ</option>
          <option>Електро</option>
          <option>Гібрид</option>
        </select>
        <select value={car.transmission} onChange={e => setCar({ ...car, transmission: e.target.value })} className="p-2 rounded bg-white/20 mr-2">
          <option>Автомат</option>
          <option>Механіка</option>
        </select>
        <select value={car.drive} onChange={e => setCar({ ...car, drive: e.target.value })} className="p-2 rounded bg-white/20">
          <option>Передній</option>
          <option>Задній</option>
          <option>Повний</option>
        </select>
      </div>

      {/* Функції авто */}
      <h3 className="font-bold mb-2">Комплектація</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {initialFeatures.map(f => (
          <label key={f} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={car.features.includes(f)}
              onChange={() => handleFeature(f)}
            />
            {f}
          </label>
        ))}
      </div>

      {/* Завантаження фото */}
      <div className="mb-4">
        <label className="block font-bold mb-2">Фото (від 5 до 10):</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {car.photos.length > 0 && Array.from(car.photos).map((file, idx) =>
            <img key={idx} src={URL.createObjectURL(file)} alt="" className="w-16 h-16 object-cover rounded" />
          )}
        </div>
      </div>

      <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded" type="submit">
        Додати автомобіль
      </button>
    </form>
  );
}
