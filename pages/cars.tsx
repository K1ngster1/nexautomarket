import AppHeader from "../components/AppHeader";
import CarCard from "../components/CarCard";

// Тимчасовий список авто (заміниться на підключення до Supabase)
const cars = [
  {
    id: 1,
    img: "/cars/1.jpg",
    title: "Renault Sandero Stepway",
    year: 2020,
    mileage: "89 000 км",
    engine: "1.5л Дизель",
    transmission: "Механіка",
    drive: "Передній",
    price: "$11 500"
  },
  // Додай свої авто!
];

export default function Cars() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15161a] via-[#242632] to-[#35374d] text-white flex flex-col">
      <AppHeader />
      <div className="w-full max-w-2xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cars.map(car => (
          <CarCard car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
}
