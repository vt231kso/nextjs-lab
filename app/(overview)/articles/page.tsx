"use client"; // Робимо компонент клієнтським для SWR

import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticlesPage() {
  const { data: posts, error, isLoading } = useSWR('/api/articles', fetcher);


  if (isLoading) return (
    <div className="flex h-screen items-center justify-center text-[#1e40af] font-bold">
      Завантаження публікацій...
    </div>
  );

  // Обробка помилки
  if (error) return (
    <div className="flex h-screen items-center justify-center text-red-500">
      Помилка завантаження: {error.message}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="mb-12 text-center text-4xl font-extrabold tracking-tight text-[#1e40af]">
        <span className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] bg-clip-text text-transparent">
          Останні публікації
        </span>
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-[#facc15]" />
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts && posts.map((post: any) => (
          <article
            key={post.id}
            className="group relative flex flex-col rounded-[20px] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(30,64,175,0.1)] border border-slate-100"
          >
            <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#facc15] text-sm font-bold text-[#1e40af] shadow-md">
              #{post.id}
            </span>

            <h2 className="mb-4 text-xl font-bold leading-tight text-[#0f172a] group-hover:text-[#1e40af] transition-colors line-clamp-2">
              {post.title}
            </h2>

            <p className="mb-8 text-slate-500 line-clamp-3 leading-relaxed">
              {post.body}
            </p>

            {/* Додаємо інформацію про автора, якщо вона є у базі */}
            {post.author && (
              <div className="mb-4 text-xs font-semibold text-slate-400">
                Автор: {post.author.name}
              </div>
            )}

            <Link
              href={`/articles/${post.id}`}
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#1e40af] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(30,64,175,0.3)] transition-all hover:bg-[#1e3a8a] hover:shadow-[0_6px_20px_rgba(30,64,175,0.4)] active:scale-95"
            >
              Читати далі
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
