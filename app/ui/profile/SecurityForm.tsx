"use client";

import { useState } from "react";
import { changePassword } from "@/app/actions/authActions";

export default function SecurityForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    const result = await changePassword(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: result.success! });
      (document.getElementById('security-form') as HTMLFormElement).reset();
    }
    setIsPending(false);
  }

  const inputStyles = "w-full border border-gray-200 rounded-xl p-3 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 shadow-sm";

  return (
    <form id="security-form" action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
          🔒 Поточний пароль
        </label>
        <input name="oldPassword" type="password" required className={inputStyles} />
      </div>

      <div className="space-y-2 border-t pt-4">
        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
          ✨ Новий пароль
        </label>
        <input name="newPassword" type="password" required className={inputStyles} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
          ✅ Підтвердіть пароль
        </label>
        <input name="confirmPassword" type="password" required className={inputStyles} />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2 ${
          isPending ? "bg-gray-400" : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800"
        }`}
      >
        {isPending ? "Оновлення..." : "Змінити пароль"}
      </button>
    </form>
  );
}
