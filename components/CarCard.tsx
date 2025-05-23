import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

type Car = {
  id: string | number;
  img: string;
  title: string;
  year: number;
  mileage: string;
  engine: string;
  transmission: string;
  drive: string;
  price: string;
};

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="rounded-2xl bg-white/10 shadow-md overflow-hidden flex flex-col h-full hover:scale-[1.02] transition group relative">
      <Link href={`/car/${car.id}`} className="block flex-1">
        <img src={car.img} alt={car.title} className="w-full h-36 object-cover" />
        <div className="p-3">
          <div className="font-bold text-base mb-1">{car.title}</div>
          <div className="flex flex-wrap gap-3 text-xs text-white/80">
            <span>🚗 {car.year} р.в.</span>
            <span>⏱ {car.mileage}</span>
            <span>⚡ {car.engine}</span>
            <span>⚙ {car.transmission}</span>
            <span>🛞 {car.drive}</span>
          </div>
          <div className="mt-2 text-lg font-bold text-violet-400">{car.price}</div>
        </div>
      </Link>
      <FavoriteButton carId={car.id} />
    </div>
  );
}
