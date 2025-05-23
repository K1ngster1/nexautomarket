import { useState } from "react";

export default function CarGallery({ photos }: { photos: string[] }) {
  const [main, setMain] = useState(0);

  return (
    <div>
      <img src={photos[main]} alt="car photo" className="w-full h-52 object-cover rounded-xl shadow mb-2" />
      <div className="flex gap-2">
        {photos.map((p, idx) => (
          <img
            key={idx}
            src={p}
            alt={`car small ${idx}`}
            className={`w-16 h-12 object-cover rounded-md border-2 ${main === idx ? "border-violet-500" : "border-transparent"} cursor-pointer`}
            onClick={() => setMain(idx)}
          />
        ))}
      </div>
    </div>
  );
}
