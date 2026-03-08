"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const { data: post, error, isLoading } = useSWR(`/api/articles/${id}`, fetcher);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);


  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      if (res.ok) {
        router.push(`/articles/${id}`);
        router.refresh();
      } else {
        alert("Не вдалося зберегти зміни. Перевірте консоль сервера.");
      }
    } catch (err) {
      alert("Виникла помилка при відправці запиту.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center text-[#1e40af] font-bold">
      Завантаження форми редагування...
    </div>
  );

  if (error) return (
    <div className="flex h-screen items-center justify-center text-red-500">
      Помилка завантаження даних для редагування.
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <Link href={`/articles/${id}`} className="inline-flex items-center text-[#1e40af] font-bold mb-8 hover:-translate-x-1 transition-transform">
        ← Скасувати та повернутися
      </Link>

      <div className="bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative">

        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#facc15]" />

        <div className="p-8 md:p-14">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-black text-[#0f172a] mb-2 uppercase tracking-tight">
              Редагування публікації
            </h1>
            <p className="text-slate-400 font-medium italic">Змінюйте заголовок або зміст вашої статті</p>
          </header>

          <form onSubmit={handleUpdate} className="space-y-8">

            <div className="flex flex-col gap-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-[#1e40af] ml-1">
                Заголовок статті
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введіть нову назву..."
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-[20px] focus:border-[#1e40af] focus:bg-white outline-none transition-all font-bold text-[#0f172a] shadow-inner"
                required
              />
            </div>


            <div className="flex flex-col gap-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-[#1e40af] ml-1">
                Зміст (Content)
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Напишіть щось цікаве..."
                rows={12}
                className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[25px] focus:border-[#1e40af] focus:bg-white outline-none transition-all text-[#0f172a] leading-relaxed shadow-inner"
                required
              />
            </div>


            <div className="pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full group relative flex items-center justify-center gap-3 bg-[#1e40af] text-white py-5 rounded-[22px] font-black text-xl shadow-[0_15px_35px_rgba(30,64,175,0.3)] hover:bg-[#1e3a8a] hover:shadow-[0_20px_45px_rgba(30,64,175,0.4)] transition-all active:scale-[0.97] disabled:bg-slate-300 disabled:shadow-none"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-3 border-white/40 border-t-white rounded-full animate-spin" />
                    Зберігаємо...
                  </div>
                ) : (
                  <>
                    Оновити публікацію
                    <span className="transition-transform group-hover:translate-x-1">🚀</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
