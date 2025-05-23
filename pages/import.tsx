import { useState } from "react";

export default function Import() {
  const [form, setForm] = useState({name: '', phone: '', comment: ''});
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Тут можна зробити відправку заявки через супебейс або телеграм бот
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15161a] via-[#242632] to-[#35374d] text-white flex flex-col items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Замовити авто з Америки</h2>
        {sent ? (
          <div className="text-green-400 text-lg">Заявку надіслано! Ми зв'яжемося з вами.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Ваше ім'я"
              value={form.name}
              onChange={handleChange}
              className="px-4 py-3 rounded bg-black/30 text-white outline-none"
              required
            />
            <input
              name="phone"
              placeholder="Телефон"
              value={form.phone}
              onChange={handleChange}
              className="px-4 py-3 rounded bg-black/30 text-white outline-none"
              required
            />
            <textarea
              name="comment"
              placeholder="Яке авто вас цікавить?"
              value={form.comment}
              onChange={handleChange}
              className="px-4 py-3 rounded bg-black/30 text-white outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
            >
              Відправити заявку
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
