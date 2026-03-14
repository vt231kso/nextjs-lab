'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {useSession} from "next-auth/react";

export default function CreateArticlePage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Передаємо тільки заголовок та зміст
      body: JSON.stringify({ title, body }),
    });

    if (response.ok) {
      router.push('/articles');
      router.refresh();
    } else {
      // Можна вивести більш детальну помилку
      const errorData = await response.json();
      alert(errorData.error || 'Помилка при створенні');
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Кнопка назад */}
        <Link href="/articles" className="inline-flex items-center text-[#1e40af] font-semibold mb-8 hover:translate-x-1 transition-transform">
          ← Назад до статей
        </Link>

        <div className="relative bg-white rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          {/* Декоративна верхня лінія */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1e40af] to-[#facc15]" />

          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-black text-[#0f172a] mb-2 tracking-tight">
              Нова публікація
            </h1>
            <p className="text-slate-500 mb-8">Заповніть поля нижче, щоб додати статтю </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1e40af] uppercase tracking-wider ml-1">
                  Заголовок статті
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введіть цікаву назву..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:bg-white transition-all text-[#0f172a] font-medium placeholder:text-slate-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1e40af] uppercase tracking-wider ml-1">
                  Зміст публікації
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Про що буде ваша стаття?"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:bg-white transition-all text-[#0f172a] leading-relaxed placeholder:text-slate-300"
                  rows={6}
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative flex items-center justify-center gap-3 bg-[#1e40af] text-white py-4 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(30,64,175,0.2)] hover:bg-[#1e3a8a] hover:shadow-[0_15px_30px_rgba(30,64,175,0.3)] transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Зберігаємо...
                    </span>
                  ) : (
                    <>
                      Опублікувати статтю
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Підказка знизу */}
        {/* Підказка знизу */}
        <p className="mt-8 text-center text-slate-400 text-sm italic">
          Ваша стаття буде автоматично приписана до автора:{" "}
          <span className="text-[#1e40af] font-bold">
    {session?.user?.name || "Завантаження..."}
  </span>
        </p>
      </div>
    </div>
  );
}
