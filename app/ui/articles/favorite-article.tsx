// app/ui/articles/favorite-article.tsx
import Link from 'next/link';

export function FavoriteArticle({ article }: { article: any }) {
  return (
    <article className="group relative flex flex-col rounded-[20px] bg-white p-7 shadow-md border border-slate-100 transition-all hover:shadow-xl">
      <div className="absolute top-4 right-4 text-[#facc15] text-xl">★</div>

      <h2 className="mb-4 text-xl font-bold text-[#0f172a] group-hover:text-[#1e40af] transition-colors">
        {article.title}
      </h2>

      <p className="mb-8 text-slate-500 line-clamp-3 text-sm italic">
        {article.body}
      </p>

      <div className="mt-auto flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400">
          Автор: {article.author?.name || 'Невідомий'}
        </span>
        <Link
          href={`/articles/${article.id}`}
          className="text-sm font-black text-[#1e40af] hover:underline"
        >
          Читати →
        </Link>
      </div>
    </article>
  );
}
