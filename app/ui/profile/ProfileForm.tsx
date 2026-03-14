'use client';

import { updateProfile } from "@/app/actions/userActions";
import { useState } from "react";

export default function ProfileForm({ user }: { user: any }) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setStatus(null);
    try {
      await updateProfile(formData);
      setStatus('success');
      // Приховуємо повідомлення через 3 секунди
      setTimeout(() => setStatus(null), 3000);
    } catch (e) {
      setStatus('error');
    } finally {
      setIsPending(false);
    }
  }

  const inputStyles = "w-full border border-gray-200 rounded-xl p-3 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 shadow-sm";

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      {/* Поле імені */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-600 ml-1 flex items-center gap-2">
          <span>👤</span> Повне ім'я
        </label>
        <input
          name="name"
          placeholder="Як вас звати?"
          defaultValue={user.name || ""}
          className={inputStyles}
        />
      </div>

      {/* Поле віку */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-600 ml-1 flex items-center gap-2">
          <span>🎂</span> Ваш вік
        </label>
        <input
          name="age"
          type="number"
          placeholder="Наприклад: 20"
          defaultValue={user.age || ""}
          className={inputStyles}
        />
      </div>

      {/* Поле Біо */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-600 ml-1 flex items-center gap-2">
          <span>📝</span> Про себе
        </label>
        <textarea
          name="bio"
          placeholder="Розкажіть щось цікаве..."
          defaultValue={user.bio || ""}
          className={`${inputStyles} h-32 resize-none`}
        />
      </div>

      {/* Статусні повідомлення */}
      {status === 'success' && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          ✅ Дані успішно оновлено!
        </div>
      )}
      {status === 'error' && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium animate-in fade-in">
          ❌ Сталася помилка при збереженні.
        </div>
      )}

      {/* Кнопка */}
      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex justify-center items-center gap-2 ${
          isPending
            ? "bg-gray-400 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        }`}
      >
        {isPending ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Збереження...
          </>
        ) : (
          "Зберегти налаштування"
        )}
      </button>
    </form>
  );
}
