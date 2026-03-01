'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './nav-links.module.css';

const links = [
  { name: 'Articles', href: '/articles' },
  { name: 'Settings', href: '/profile/settings' },
  { name: 'Security', href: '/profile/security' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          pathname.startsWith(link.href + '/');

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(styles.link, {
              [styles.active]: isActive,
            })}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
