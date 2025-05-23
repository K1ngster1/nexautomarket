import { useRouter } from "next/router";
import CarGallery from "../../components/CarGallery";
import TelegramButton from "../../components/TelegramButton";
import Link from "next/link";

const cars = [
  {
    id: 1,
    title: "Renault Sandero Stepway",
    price: "$11 500",
    year: 2020,
    mileage: "89 000 км",
    engine: "1.5л Дизель",
    transmission: "Механіка",
    drive: "Передній",
    photos: ["/cars/1.jpg", "/cars/2.jpg", "/cars/3.jpg"],
    features: [
      "Протитуманні фари", "Круїз контроль", "ESP", "Автомагнітола", "Кондиціонер",
      "Підсилювач керма", "ABS", "Легкосплавні диски", "Центральний замок", "Паркотронік",
      "Тонування", "Електрозеркала", "Підігрів сидінь", "Задня камера", "Склопідйомники"
    ],
    vin: "VF155RCLC65919452",
    description: "Авто у відмінному стані, без ДТП, 1 власник.",
  },
  // Додавай свої!
];

export default function CarDetail() {
  const router = useRouter();
  const { id } = router.query;
  const car = cars.find((c) => String(c.id) === String(id));

  if (!car) return <div className="text-white p-10">Авто не знайдено</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15161a] via-[#242632] to-[#35374d] text-white flex flex-col">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => router.back()}
        className="self-start mx-auto mt-6 mb-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium flex items-center transition"
      >
        <span className="mr-2">←</span>
        Назад
      </button>

      <div className="max-w-4xl w-full mx-auto mt-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <CarGallery photos={car.photos} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{car.title} {car.year}</h2>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mb-3">
            <span>⏱ {car.mileage}</span>
            <span>⚡ {car.engine}</span>
            <span>⚙ {car.transmission}</span>
            <span>🛞 {car.drive}</span>
          </div>
          <div className="text-2xl font-bold text-violet-400 mb-2">{car.price}</div>
          <div className="mb-2 text-xs text-white/60">VIN-код: {car.vin}</div>
          <div className="mb-4">{car.description}</div>
          <TelegramButton />
          <div className="mt-6">
            <div className="font-bold mb-2">Комплектація</div>
            <ul className="grid grid-cols-2 gap-2 text-green-400">
              {car.features.map((f, idx) => (
                <li key={idx}>✔ {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
