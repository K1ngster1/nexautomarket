import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Car } from '../types/Car'

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "123456"; // зміни на свої!

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [car, setCar] = useState<Partial<Car>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Для фото
  const [files, setFiles] = useState<File[]>([]);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [previews, setPreviews] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
    } else {
      alert('Невірний логін або пароль!');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let arr = Array.from(e.target.files).slice(0, 10);
      setFiles(arr);
      setPreviews(arr.map(file => URL.createObjectURL(file)));
    }
  };

  const uploadPhotos = async () => {
    setPhotoLoading(true);
    setUploadError('');
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `car_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error } = await supabase.storage
        .from('car-photos')
        .upload(fileName, file);
      if (error) {
        setPhotoLoading(false);
        setUploadError('Помилка при завантаженні фото!');
        return [];
      }
      const url = supabase.storage.from('car-photos').getPublicUrl(fileName).data.publicUrl;
      urls.push(url);
    }
    setPhotoLoading(false);
    return urls;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCar(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    let images = '';
    if (files.length > 0) {
      const urls = await uploadPhotos();
      if (!urls.length) {
        setLoading(false);
        return;
      }
      images = urls.join(',');
    } else {
      images = car.images || '';
    }

    const { error } = await supabase.from('cars').insert([{ ...car, images }]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      setCar({});
      setFiles([]);
      setPreviews([]);
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
          <input
            placeholder="Логін"
            value={login}
            onChange={e => setLogin(e.target.value)}
            style={{ fontSize: 18, padding: 8, borderRadius: 6, border: "1px solid #bbb", color: "#222" }}
          />
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ fontSize: 18, padding: 8, borderRadius: 6, border: "1px solid #bbb", color: "#222" }}
          />
          <button type="submit" style={{
            padding: "12px", borderRadius: 8, background: "linear-gradient(90deg,#b286fd,#7f47e6)",
            color: "#fff", fontWeight: 700, fontSize: "18px", cursor: "pointer"
          }}>Увійти</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 480, margin: '30px auto', padding: 20, background: '#222435', borderRadius: 20, color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Додати авто</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Назва" required value={car.title || ''} onChange={handleChange} style={inputStyle} />
        <input name="price" type="number" placeholder="Ціна" required value={car.price || ''} onChange={handleChange} style={inputStyle} />
        <input name="year" type="number" placeholder="Рік" required value={car.year || ''} onChange={handleChange} style={inputStyle} />
        <input name="mileage" type="number" placeholder="Пробіг" required value={car.mileage || ''} onChange={handleChange} style={inputStyle} />
        <input name="engine" placeholder="Двигун (наприклад 1.5л Дизель)" value={car.engine || ''} onChange={handleChange} style={inputStyle} />
        
        {/* Селект КПП */}
        <select name="transmission" required value={car.transmission || ''} onChange={handleChange} style={inputStyle}>
          <option value="">КПП</option>
          <option value="Механіка">Механіка</option>
          <option value="Автомат">Автомат</option>
        </select>

        {/* Селект привід */}
        <select name="drive" required value={car.drive || ''} onChange={handleChange} style={inputStyle}>
          <option value="">Привід</option>
          <option value="Передній">Передній</option>
          <option value="Задній">Задній</option>
          <option value="Повний">Повний</option>
        </select>
        
        <input name="vin" placeholder="VIN" value={car.vin || ''} onChange={handleChange} style={inputStyle} />

        {/* Селект статус */}
        <select name="status" required value={car.status || ''} onChange={handleChange} style={inputStyle}>
          <option value="">Статус</option>
          <option value="В наявності">В наявності</option>
          <option value="В дорозі">В дорозі</option>
        </select>

        <textarea name="description" placeholder="Опис" value={car.description || ''} onChange={handleChange} style={{ ...inputStyle, height: 80 }} />
        
        <div style={{ marginBottom: 12 }}>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
          <div style={{ color: "#aaa", fontSize: 13 }}>До 10 фото. Нові перезапишуть старі!</div>
          {previews.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 8, gap: 8 }}>
              {previews.map((url, idx) => (
                <img key={idx} src={url} alt={`car_${idx}`} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, border: "2px solid #222" }} />
              ))}
            </div>
          )}
        </div>

        <button type="submit" style={buttonStyle} disabled={loading || photoLoading}>
          {loading || photoLoading ? 'Додаємо...' : 'Додати'}
        </button>
        {uploadError && <div style={{ color: "#ff7373", marginTop: 10 }}>{uploadError}</div>}
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
  fontSize: '16px',
  color: '#222',         // ВАЖЛИВО: щоб текст був чорним і видно!
  background: '#fff',    // Світлий фон для інпутів
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
