import { Post, Comment } from "@/types/post";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

async function getArticleData(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { cache: 'force-cache' });
  if (!res.ok) notFound();
  return res.json();
}

async function getComments(id: string): Promise<Comment[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, { cache: 'force-cache' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getArticleData(id), getComments(id)]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Кнопка назад */}
      <Link href="/articles" className="inline-flex items-center text-[#1e40af] font-semibold mb-8 hover:translate-x-1 transition-transform">
        ← Назад до списку статей
      </Link>

      {/* Основна стаття */}
      <article className="relative p-8 md:p-12 rounded-[30px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 mb-16 overflow-hidden">
        {/* Декоративна лінія збоку */}
        <div className="absolute top-0 left-0 w-2 h-full bg-[#1e40af]" />

        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1 rounded-full bg-[#facc15] text-[#1e40af] text-xs font-black uppercase tracking-widest">
            Стаття #{post.id}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-8 leading-tight capitalize italic">
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
            {comments.length}
          </span>
          <div className="flex-grow h-[1px] bg-slate-200" />
        </div>

        <div className="grid gap-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group p-6 bg-slate-50 rounded-[20px] border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {comment.email[0].toUpperCase()}
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
        </div>
      </section>
    </div>
  );
}
