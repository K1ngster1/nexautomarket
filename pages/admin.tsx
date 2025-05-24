import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Car } from '../types/Car'

export default function AddCar() {
  const [car, setCar] = useState<Partial<Car>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCar(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    // images у нас як стрічка: посилання через кому
    const { error } = await supabase.from('cars').insert([{ ...car }]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      setCar({});
    } else {
      alert('Помилка при додаванні авто!');
    }
  };

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
