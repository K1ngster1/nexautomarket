import { useState } from "react";

export default function FavoriteButton({ carId }: { carId: string | number }) {
  const [isFav, setIsFav] = useState(false);

  return (
    <button
      className={`absolute top-3 right-3 z-10 rounded-full p-2 bg-black/60 hover:bg-violet-500 transition`}
      onClick={(e) => {
        e.preventDefault();
        setIsFav((prev) => !prev);
        // TODO: Тут буде логіка збереження у localStorage
      }}
      title={isFav ? "Видалити з обраного" : "Додати в обране"}
    >
      {isFav ? (
        <span className="text-violet-400 text-xl">♥</span>
      ) : (
        <span className="text-white text-xl">♡</span>
      )}
    </button>
  );
}
