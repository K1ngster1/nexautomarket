import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

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
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFeature = (feature: string) => {
    setCar((prev: any) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f: string) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 10) : [];
    setPhotos(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // upload photos to supabase storage
    const photoUrls: string[] = [];
    for (const file of photos) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("car-photos")
        .upload(fileName, file);
      if (error) {
        alert("Фото не завантажено: " + error.message);
        setLoading(false);
        return;
      }
      // формуємо URL
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/car-photos/${fileName}`;
      photoUrls.push(url);
    }

    // запис у базу
    const { error: dbError } = await supabase.from("cars").insert([{
      ...car,
      year: Number(car.year),
      photos: photoUrls,
      features: car.features,
      created_at: new Date().toISOString()
    }]);
    setLoading(false);

    if (dbError) {
      alert("Помилка додавання авто: " + dbError.message);
      return;
    }

    alert("Авто додано!");
    router.push("/"); // на головну, або на список авто
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white/10 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Основна інформація</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input name="brand" placeholder="Виробник" value={car.brand} onChange={handleChange} className="p-2 rounded bg-white/20" />
        <input name="model" placeholder="Модель" value={car.model} onChange={handleChange} className="p-2 rounded bg-white/20" />
        <input name="year" placeholder="Рік" value={car.year} onChange={handleChange} className="p-2 rounded bg-white/20" />
        <input name="mileage" placeholder="Пробіг" value={car.mileage} onChange={handleChange} className="p-2 rounded bg-white/20" />
        <input name="vin" placeholder="VIN-код" value={car.vin} onChange={handleChange} className="p-2 rounded bg-white/20" />
        <input name="engine" placeholder="Обʼєм двигуна (л)" value={car.engine} onChange={handleChange} className="p-2 rounded bg-white/20" />
        <input name="color" placeholder="Колір" value={car.color} onChange={handleChange} className="p-2 rounded bg-white/20" />
        <input name="price" placeholder="Ціна (USD)" value={car.price} onChange={handleChange} className="p-2 rounded bg-white/20" />
      </div>
      <div className="mb-4">
        <select name="fuel" value={car.fuel} onChange={handleChange} className="p-2 rounded bg-white/20 mr-2">
          <option>Бензин</option>
          <option>Дизель</option>
          <option>Газ</option>
          <option>Електро</option>
          <option>Гібрид</option>
        </select>
        <select name="transmission" value={car.transmission} onChange={handleChange} className="p-2 rounded bg-white/20 mr-2">
          <option>Автомат</option>
          <option>Механіка</option>
        </select>
        <select name="drive" value={car.drive} onChange={handleChange} className="p-2 rounded bg-white/20">
          <option>Передній</option>
          <option>Задній</option>
          <option>Повний</option>
        </select>
      </div>
      <h3 className="font-bold mb-2">Комплектація</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {initialFeatures.map(f => (
          <label key={f} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={car.features.includes(f)} onChange={() => handleFeature(f)} />
            {f}
          </label>
        ))}
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Фото (від 5 до 10):</label>
        <input type="file" accept="image/*" multiple onChange={handlePhotoChange} />
        <div className="flex gap-2 mt-2 flex-wrap">
          {photos.map((file, idx) => <img key={idx} src={URL.createObjectURL(file)} alt="" className="w-16 h-16 object-cover rounded" />)}
        </div>
      </div>
      <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
        {loading ? "Додаємо..." : "Додати автомобіль"}
      </button>
    </form>
  );
}
