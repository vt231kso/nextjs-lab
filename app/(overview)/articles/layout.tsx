// app/(overview)/articles/layout.tsx
import Link from 'next/link';
import ArticlesNavLinks from '@/app/ui/articles/nav-links';

export default function ArticlesLayout({
                                         children,
                                       }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Додаткове меню для статей */}
      <nav className="flex gap-4 border-b pb-2">
        <ArticlesNavLinks />
      </nav>

      <div>{children}</div>
    </div>
  );
}
