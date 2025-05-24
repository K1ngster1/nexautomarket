import { useState } from "react";

export default function AdminPage() {
  // Простий логін-пароль (заміни на свої)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // Сюди заносимо дані форми авто
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    vin: "",
    engineVolume: "",
    fuelType: "Бензин",
    transmission: "Автомат",
    drive: "Повний",
    color: "",
    price: "",
    photos: [] as File[],
    features: [] as string[],
    description: "",
  });
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const featureList = [
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
  ];

  // Авторизація
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Заміни ці значення на свої
    if (login === "admin" && password === "nex2024") {
      setIsLoggedIn(true);
    } else {
      alert("Невірний логін або пароль!");
    }
  }

  // Зміна форми
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  }

  // Завантаження фото
  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const arr = Array.from(files);
    setCar((prev) => ({ ...prev, photos: arr }));
    setPhotoPreviews(arr.map((f) => URL.createObjectURL(f)));
  }

  // Вибір опцій
  function toggleFeature(feature: string) {
    setCar((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  }

  // Submit форми
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Тут відправ дані на бекенд або у supabase!
    alert("Авто додано:\n" + JSON.stringify(car, null, 2));
    setCar({
      brand: "",
      model: "",
      year: "",
      mileage: "",
      vin: "",
      engineVolume: "",
      fuelType: "Бензин",
      transmission: "Автомат",
      drive: "Повний",
      color: "",
      price: "",
      photos: [],
      features: [],
      description: "",
    });
    setPhotoPreviews([]);
  }

  // --- ЛОГІН ---
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleLogin} style={{ minWidth: 300, border: "1px solid #ccc", padding: 40, borderRadius: 12, background: "#fff" }}>
          <h2 style={{ textAlign: "center", marginBottom: 30 }}>Вхід в адмінку</h2>
          <div>
            <input
              type="text"
              placeholder="Логін"
              value={login}
              onChange={e => setLogin(e.target.value)}
              style={{ width: "100%", padding: 8, marginBottom: 20, fontSize: 18 }}
              autoFocus
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: "100%", padding: 8, marginBottom: 20, fontSize: 18 }}
            />
          </div>
          <button
            type="submit"
            style={{ width: "100%", background: "#7c3aed", color: "#fff", padding: 10, fontSize: 18, borderRadius: 8, border: "none" }}
          >Увійти</button>
        </form>
      </div>
    );
  }

  // --- ФОРМА ДОДАВАННЯ АВТО ---
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 14, boxShadow: "0 0 20px #eee" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Додати автомобіль</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label>Виробник</label>
            <input type="text" name="brand" value={car.brand} onChange={handleChange} className="input" />
          </div>
          <div style={{ flex: 1 }}>
            <label>Модель</label>
            <input type="text" name="model" value={car.model} onChange={handleChange} className="input" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label>Рік</label>
            <input type="number" name="year" value={car.year} onChange={handleChange} className="input" />
          </div>
          <div style={{ flex: 1 }}>
            <label>Пробіг</label>
            <input type="number" name="mileage" value={car.mileage} onChange={handleChange} className="input" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label>VIN-код</label>
            <input type="text" name="vin" value={car.vin} onChange={handleChange} className="input" />
          </div>
          <div style={{ flex: 1 }}>
            <label>Обʼєм двигуна (л)</label>
            <input type="text" name="engineVolume" value={car.engineVolume} onChange={handleChange} className="input" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label>Тип палива</label>
            <select name="fuelType" value={car.fuelType} onChange={handleChange} className="input">
              <option>Бензин</option>
              <option>Дизель</option>
              <option>Газ</option>
              <option>Електро</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Трансмісія</label>
            <select name="transmission" value={car.transmission} onChange={handleChange} className="input">
              <option>Автомат</option>
              <option>Механіка</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label>Привід</label>
            <select name="drive" value={car.drive} onChange={handleChange} className="input">
              <option>Повний</option>
              <option>Передній</option>
              <option>Задній</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Колір</label>
            <input type="text" name="color" value={car.color} onChange={handleChange} className="input" />
          </div>
        </div>
        <div>
          <label>Ціна (USD)</label>
          <input type="number" name="price" value={car.price} onChange={handleChange} className="input" />
        </div>
        <div style={{ margin: "15px 0" }}>
          <label>Фото авто (від 5 до 10)</label>
          <input type="file" multiple accept="image/*" onChange={handlePhotos} />
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            {photoPreviews.map((url, i) => (
              <img key={i} src={url} alt="preview" style={{ width: 80, borderRadius: 8 }} />
            ))}
          </div>
        </div>
        <div>
          <label>Опис авто</label>
          <textarea name="description" value={car.description} onChange={handleChange} className="input" rows={4} />
        </div>
        <div style={{ marginTop: 20 }}>
          <label>Функції автомобіля:</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 30px", marginTop: 8 }}>
            {featureList.map((feature) => (
              <label key={feature} style={{ fontWeight: 400 }}>
                <input
                  type="checkbox"
                  checked={car.features.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  style={{ marginRight: 6 }}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginTop: 30,
            background: "#7c3aed",
            color: "#fff",
            padding: "12px 38px",
            fontSize: 18,
            borderRadius: 10,
            border: "none",
            fontWeight: "bold"
          }}
        >Додати автомобіль</button>
      </form>
      <style jsx>{`
        .input {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          margin-bottom: 10px;
        }
        label {
          font-weight: 500;
          margin-bottom: 2px;
        }
      `}</style>
    </div>
  );
}
