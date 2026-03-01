'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Articles Favorite', href: '/articles/favorite' },
  { name: 'Articles Create', href: '/articles/create' },
];

export default function ArticlesNavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex  gap-2"> {/* Додав контейнер для відступів між посиланнями */}
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          pathname.startsWith(link.href + '/');

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(

              'relative flex h-[48px] items-center justify-start gap-3 px-5 rounded-[14px] text-sm font-semibold transition-all duration-300 ease-in-out',
              {

                'bg-[#1e40af] text-white shadow-[0_8px_20px_rgba(30,64,175,0.3)]': isActive,


                'text-slate-600 hover:bg-blue-50 hover:text-[#1e40af] hover:translate-x-1': !isActive,
              }
            )}
          >


            <span className="relative z-10">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
