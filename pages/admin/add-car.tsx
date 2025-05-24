import { useState, ChangeEvent } from "react";

type Car = {
  make: string;
  model: string;
  year: string;
  mileage: string;
  vin: string;
  engine: string;
  fuel: string;
  transmission: string;
  drive: string;
  color: string;
  price: string;
  features: string[];
  options: string[];
  photos: File[];
};

const featureList = [
  "Протитуманні фари", "Центральний замок", "Шкіряний салон", "Парктронік", "Мультируль", "ESP",
  "Сенсор дощу", "Підігрів сидінь", "Круїз контроль", "Задня камера", "ABS", "Автомагнітола"
];
const optionList = [
  "Клімат контроль", "Кондиціонер", "Датчик світла", "Навігація GPS", "Передня камера",
  "Тонування", "Легкосплавні диски", "Сигналізація", "Підсилювач керма", "Камера 360",
  "Склопідйомники", "Електрозеркала"
];

export default function AddCar() {
  const [car, setCar] = useState<Car>({
    make: "",
    model: "",
    year: "",
    mileage: "",
    vin: "",
    engine: "",
    fuel: "",
    transmission: "",
    drive: "",
    color: "",
    price: "",
    features: [],
    options: [],
    photos: []
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleFeature = (feature: string) => {
    setCar((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleOption = (option: string) => {
    setCar((prev) => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter((o) => o !== option)
        : [...prev.options, option],
    }));
  };

  const handlePhotos = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 10); // max 10
    setCar((prev) => ({ ...prev, photos: files }));
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут відправляєш car у Supabase
    alert("Машину додано! (Імітація)");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Додати автомобіль</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* --- Основна інформація --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Виробник</label>
            <input name="make" value={car.make} onChange={handleChange} className="input" placeholder="BMW, Audi, тощо" />
          </div>
          <div>
            <label>Модель</label>
            <input name="model" value={car.model} onChange={handleChange} className="input" placeholder="X5, A4, тощо" />
          </div>
          <div>
            <label>Рік</label>
            <input name="year" type="number" value={car.year} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Пробіг</label>
            <input name="mileage" value={car.mileage} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>VIN-код</label>
            <input name="vin" value={car.vin} onChange={handleChange} className="input" />
          </div>
          <div>
            <label>Обʼєм двигуна (л)</label>
            <input name="engine" value={car.engine} onChange={handleChange} className="input" placeholder="Наприклад: 1.4" />
          </div>
          <div>
            <label>Тип палива</label>
            <select name="fuel" value={car.fuel} onChange={handleChange} className="input">
              <option value="">Оберіть</option>
              <option>Бензин</option>
              <option>Дизель</option>
              <option>Газ</option>
              <option>Гібрид</option>
              <option>Електро</option>
            </select>
          </div>
          <div>
            <label>Трансмісія</label>
            <select name="transmission" value={car.transmission} onChange={handleChange} className="input">
              <option value="">Оберіть</option>
              <option>Механіка</option>
              <option>Автомат</option>
              <option>Робот</option>
              <option>Варіатор</option>
            </select>
          </div>
          <div>
            <label>Привід</label>
            <select name="drive" value={car.drive} onChange={handleChange} className="input">
              <option value="">Оберіть</option>
              <option>Передній</option>
              <option>Задній</option>
              <option>Повний</option>
            </select>
          </div>
          <div>
            <label>Колір</label>
            <input name="color" value={car.color} onChange={handleChange} className="input" placeholder="Сірий, Чорний, Білий, ..." />
          </div>
          <div>
            <label>Ціна (USD)</label>
            <input name="price" value={car.price} onChange={handleChange} className="input" />
          </div>
        </div>

        {/* --- Фото --- */}
        <div>
          <label>Фото авто (від 5 до 10)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotos}
            className="input"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previewUrls.map((url, i) => (
              <img key={i} src={url} alt={`photo${i}`} className="w-24 h-16 object-cover rounded" />
            ))}
          </div>
        </div>

        {/* --- Функції --- */}
        <div>
          <label className="font-bold block mb-2">Функції автомобіля</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {featureList.map((f) => (
              <label key={f} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={car.features.includes(f)}
                  onChange={() => handleFeature(f)}
                />
                {f}
              </label>
            ))}
          </div>
        </div>

        {/* --- Комплектація --- */}
        <div>
          <label className="font-bold block mb-2">Комплектація</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {optionList.map((o) => (
              <label key={o} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={car.options.includes(o)}
                  onChange={() => handleOption(o)}
                />
                {o}
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
