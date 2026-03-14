"use client";

import useSWR from 'swr';
import Link from 'next/link';
import FavoriteButton from '../../ui/articles/FavoriteButton'; // Імпортуємо твою кнопку
import { useSession } from "next-auth/react"; // Додаємо, щоб знати чи залогінений юзер

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticlesPage() {
  const { data: session } = useSession();

  // Отримуємо всі статті
  const { data: posts, error: postsError, isLoading: postsLoading } = useSWR('/api/articles', fetcher);

  // Отримуємо список обраних саме цього юзера
  const { data: favorites } = useSWR(session ? '/api/articles/favorite' : null, fetcher);

  if (postsLoading) return (
    <div className="flex h-screen items-center justify-center text-[#1e40af] font-bold">
      Завантаження публікацій...
    </div>
  );

  if (postsError) return (
    <div className="flex h-screen items-center justify-center text-red-500">
      Помилка завантаження: {postsError.message}
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
        {posts && posts.map((post: any) => {
          // Перевіряємо, чи є ця стаття у списку обраних юзера
          const isInitialFavorite = favorites?.some((fav: any) => fav.id === post.id) || false;

          return (
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

              <p className="mb-6 text-slate-500 line-clamp-3 leading-relaxed">
                {post.body}
              </p>

              {post.author && (
                <div className="mb-4 text-xs font-semibold text-slate-400">
                  Автор: {post.author.name}
                </div>
              )}

              {/* Блок з кнопками */}
              <div className="mt-auto flex flex-col gap-3">
                {/* Показуємо кнопку обраного тільки якщо юзер залогінений */}
                {session && (
                  <FavoriteButton
                    articleId={post.id}
                    initialIsFavorite={isInitialFavorite}
                  />
                )}

                <Link
                  href={`/articles/${post.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#1e40af] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(30,64,175,0.3)] transition-all hover:bg-[#1e3a8a] hover:shadow-[0_6px_20px_rgba(30,64,175,0.4)] active:scale-95"
                >
                  Читати далі
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
