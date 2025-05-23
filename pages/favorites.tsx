import AppHeader from "../components/AppHeader";

export default function Favorites() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15161a] via-[#242632] to-[#35374d] text-white flex flex-col">
      <AppHeader />
      <div className="p-10 text-center text-lg">
        Тут буде список обраних авто (локально в браузері, потім — через базу).
      </div>
    </div>
  );
}
