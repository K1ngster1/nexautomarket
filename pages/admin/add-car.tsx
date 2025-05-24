import React, { useState } from "react";

type CarState = {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  vin: string;
  engineVolume: string;
  fuelType: string;
  transmission: string;
  drive: string;
  color: string;
  price: string;
  description: string;
  photos: File[];
  features: string[];
};

const initialState: CarState = {
  brand: "",
  model: "",
  year: "",
  mileage: "",
  vin: "",
  engineVolume: "",
  fuelType: "",
  transmission: "",
  drive: "",
  color: "",
  price: "",
  description: "",
  photos: [],
  features: [],
};

const featuresList = [
  "Протитуманні фари",
  "Центральний замок",
  "Шкіряний салон",
  "Парктронік",
  "Мультируль",
  "ESP",
  "Сенсор дощу",
  "Підігрів сидінь",
  "Круїз контроль",
  "Задня камера",
  "ABS",
  "Автомагнітола",
  "Клімат контроль",
  "Датчик світла",
  "Навігація GPS",
  "Передня камера",
  "Тонування",
  "Легкосплавні диски",
  "Кондиціонер",
  "Сигналізація",
  "Підсилювач керма",
  "Камера 360",
  "Склопідйомники",
  "Електрозеркала",
];

export default function AddCarPage() {
  const [car, setCar] = useState<CarState>(initialState);
  const [preview, setPreview] = useState<string[]>([]);

  // Для фото: збереження preview
  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const arr = Array.from(files);
    setCar((prev) => ({ ...prev, photos: arr }));
    // previews для відображення
    const previews = arr.map((f) => URL.createObjectURL(f));
    setPreview(previews);
  };

  // Для features
  const handleFeature = (feature: string) => {
    setCar((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  // Сабміт
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут логіка для супебейсу/відправки
    alert("Авто додано!\n" + JSON.stringify(car, null, 2));
    setCar(initialState);
    setPreview([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Додати автомобіль</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <label>
            Виробник
            <input
              className="input"
              value={car.brand}
              onChange={e => setCar({ ...car, brand: e.target.value })}
              required
            />
          </label>
          <label>
            Модель
            <input
              className="input"
              value={car.model}
              onChange={e => setCar({ ...car, model: e.target.value })}
              required
            />
          </label>
          <label>
            Рік
            <input
              className="input"
              type="number"
              value={car.year}
              onChange={e => setCar({ ...car, year: e.target.value })}
              required
            />
          </label>
          <label>
            Пробіг
            <input
              className="input"
              type="number"
              value={car.mileage}
              onChange={e => setCar({ ...car, mileage: e.target.value })}
              required
            />
          </label>
          <label>
            VIN-код
            <input
              className="input"
              value={car.vin}
              onChange={e => setCar({ ...car, vin: e.target.value })}
            />
          </label>
          <label>
            Обʼєм двигуна (л)
            <input
              className="input"
              value={car.engineVolume}
              onChange={e => setCar({ ...car, engineVolume: e.target.value })}
            />
          </label>
          <label>
            Тип палива
            <select
              className="input"
              value={car.fuelType}
              onChange={e => setCar({ ...car, fuelType: e.target.value })}
              required
            >
              <option value="">Оберіть</option>
              <option>Бензин</option>
              <option>Дизель</option>
              <option>Газ</option>
              <option>Гібрид</option>
              <option>Електро</option>
            </select>
          </label>
          <label>
            Трансмісія
            <select
              className="input"
              value={car.transmission}
              onChange={e => setCar({ ...car, transmission: e.target.value })}
              required
            >
              <option value="">Оберіть</option>
              <option>Механіка</option>
              <option>Автомат</option>
              <option>Робот</option>
              <option>Варіатор</option>
            </select>
          </label>
          <label>
            Привід
            <select
              className="input"
              value={car.drive}
              onChange={e => setCar({ ...car, drive: e.target.value })}
            >
              <option value="">Оберіть тип приводу</option>
              <option>Передній</option>
              <option>Задній</option>
              <option>Повний</option>
            </select>
          </label>
          <label>
            Колір
            <input
              className="input"
              value={car.color}
              onChange={e => setCar({ ...car, color: e.target.value })}
            />
          </label>
        </div>

        <label>
          Ціна (USD)
          <input
            className="input"
            type="number"
            value={car.price}
            onChange={e => setCar({ ...car, price: e.target.value })}
            required
          />
        </label>

        <label>
          Опис авто
          <textarea
            className="input"
            style={{ minHeight: '60px', marginTop: 4, marginBottom: 12 }}
            value={car.description}
            onChange={e => setCar({ ...car, description: e.target.value })}
            placeholder="Опишіть стан, історію, особливості автомобіля"
          />
        </label>

        <div className="my-4">
          <label>
            Фото авто (від 5 до 10)
            <input
              type="file"
              multiple
              accept="image/*"
              className="input"
              onChange={handlePhotos}
            />
          </label>
          <div className="flex gap-2 mt-2">
            {preview.map((src, idx) => (
              <img
                src={src}
                key={idx}
                alt="preview"
                style={{
                  width: 80,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </div>

        <div className="my-4">
          <div className="font-bold mb-2">Функції автомобіля / Комплектація</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {featuresList.map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={car.features.includes(feature)}
                  onChange={() => handleFeature(feature)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-violet-500 text-white font-bold px-8 py-3 rounded mt-4 hover:bg-violet-600 transition"
        >
          Додати автомобіль
        </button>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-top: 4px;
          background: #fff;
        }
        label {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
