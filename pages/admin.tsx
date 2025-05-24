import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Car } from '../types/Car'

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "123456"; // змінюй на свій!

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  // СТАНИ ДЛЯ ФОРМИ ДОДАВАННЯ АВТО
  const [car, setCar] = useState<Partial<Car>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
    } else {
      alert('Невірний логін або пароль!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCar(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const { error } = await supabase.from('cars').insert([{ ...car }]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      setCar({});
    } else {
      alert('Помилка при додаванні авто!');
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleLogin} style={{
          background: "#fff", padding: 36, borderRadius: 16, boxShadow: "0 4px 32px #e3e3f7",
          minWidth: 320, display: "flex", flexDirection: "column", gap: 16
        }}>
          <h3 style={{ textAlign: "center", marginBottom: 6 }}>Вхід в адмінку</h3>
          <input placeholder="Логін" value={login} onChange={e => setLogin(e.target.value)}
            style={{ fontSize: 18, padding: 8, borderRadius: 6, border: "1px solid #bbb" }} />
          <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ fontSize: 18, padding: 8, borderRadius: 6, border: "1px solid #bbb" }} />
          <button type="submit" style={{
            padding: "12px", borderRadius: 8, background: "linear-gradient(90deg,#b286fd,#7f47e6)",
            color: "#fff", fontWeight: 700, fontSize: "18px", cursor: "pointer"
          }}>Увійти</button>
        </form>
      </div>
    )
  }

  // Після входу — форма додавання авто!
  return (
    <div style={{ maxWidth: 480, margin: '30px auto', padding: 20, background: '#222435', borderRadius: 20, color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Додати авто</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Назва" required value={car.title || ''} onChange={handleChange} style={inputStyle} />
        <input name="price" type="number" placeholder="Ціна" required value={car.price || ''} onChange={handleChange} style={inputStyle} />
        <input name="year" type="number" placeholder="Рік" required value={car.year || ''} onChange={handleChange} style={inputStyle} />
        <input name="mileage" type="number" placeholder="Пробіг" required value={car.mileage || ''} onChange={handleChange} style={inputStyle} />
        <input name="engine" placeholder="Двигун (наприклад 1.5л Дизель)" value={car.engine || ''} onChange={handleChange} style={inputStyle} />
        <input name="transmission" placeholder="КПП (Механіка/Автомат)" value={car.transmission || ''} onChange={handleChange} style={inputStyle} />
        <input name="drive" placeholder="Привід (Передній/Задній/Повний)" value={car.drive || ''} onChange={handleChange} style={inputStyle} />
        <input name="vin" placeholder="VIN" value={car.vin || ''} onChange={handleChange} style={inputStyle} />
        <input name="status" placeholder="Статус (В наявності/В дорозі)" value={car.status || ''} onChange={handleChange} style={inputStyle} />
        <textarea name="description" placeholder="Опис" value={car.description || ''} onChange={handleChange} style={{ ...inputStyle, height: 80 }} />
        <input name="images" placeholder="Фото (посилання через кому)" value={car.images || ''} onChange={handleChange} style={inputStyle} />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Додаємо...' : 'Додати'}
        </button>
        {success && <div style={{ color: '#7cffb6', marginTop: 10 }}>Авто додано!</div>}
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '8px',
  border: 'none',
  fontSize: '16px'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: 'none',
  background: 'linear-gradient(90deg,#b286fd,#50e3c2)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '18px',
  cursor: 'pointer'
};
