"use client";

import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticlePage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: post, error, isLoading } = useSWR(`/api/articles/${id}`, fetcher);

  // Функція для видалення статті (Метод DELETE)
  const handleDelete = async () => {
    if (!confirm("Ви впевнені, що хочете видалити цю статтю?")) return;

    setIsDeleting(true);
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });

    if (res.ok) {
      router.push('/articles');
      router.refresh();
    } else {
      alert("Помилка при видаленні");
      setIsDeleting(false);
    }
  };

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center text-[#1e40af] font-bold animate-pulse">
      Завантаження змісту статті...
    </div>
  );

  if (error || !post) return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <p className="text-red-500 font-bold">Статтю не знайдено або виникла помилка</p>
      <Link href="/articles" className="text-[#1e40af] underline hover:text-[#1e3a8a]">
        Повернутися до списку
      </Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <Link href="/articles" className="inline-flex items-center text-[#1e40af] font-semibold hover:translate-x-1 transition-transform">
          ← Назад до списку статей
        </Link>

        {/* Панель керування статтею */}
        <div className="flex items-center gap-3">
          <Link
            href={`/articles/${id}/edit`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-[#1e40af] font-bold text-sm hover:bg-[#1e40af] hover:text-white transition-all shadow-sm border border-slate-200"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100 disabled:opacity-50"
          >
            {isDeleting ? "..." : "Delete"}
          </button>
        </div>
      </div>

      <article className="relative p-8 md:p-12 rounded-[30px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 mb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#1e40af]" />

        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1 rounded-full bg-[#facc15] text-[#1e40af] text-xs font-black uppercase tracking-widest">
            ID: {post.id}
          </span>
          {post.author && (
            <span className="text-sm font-bold text-slate-400 italic">
              Автор: {post.author.name}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-8 leading-tight capitalize">
          {post.title}
        </h1>

        <p className="text-xl text-slate-600 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#1e40af] first-letter:mr-3 first-letter:float-left">
          {post.body}
        </p>
      </article>

      {/* Секція коментарів */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a]">Обговорення</h2>
          <span className="flex items-center justify-center bg-[#1e40af] text-white px-3 py-1 rounded-lg text-sm font-bold">
            {post.comments?.length || 0}
          </span>
          <div className="flex-grow h-[1px] bg-slate-200" />
        </div>

        <div className="grid gap-6">
          {post.comments && post.comments.map((comment: any) => (
            <div
              key={comment.id}
              className="group p-6 bg-slate-50 rounded-[20px] border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {comment.email ? comment.email[0].toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-bold text-[#0f172a] group-hover:text-[#1e40af] transition-colors">{comment.name}</p>
                  <p className="text-xs font-semibold text-[#facc15] tracking-wide uppercase">{comment.email}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-4 ml-6">
                {comment.body}
              </p>
            </div>
          ))}

          {(!post.comments || post.comments.length === 0) && (
            <p className="text-slate-400 italic">Коментарів поки немає. Будьте першими!</p>
          )}
        </div>
      </section>
    </div>
  );
}
