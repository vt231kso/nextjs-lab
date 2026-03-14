'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './nav-links.module.css';
import LogoutButton from './logout-button';
import { useSession } from 'next-auth/react';
const links = [
  { name: 'Articles', href: '/articles' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/profile/settings' },
  { name: 'Security', href: '/profile/security' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <span className={styles.userName}>
          Привіт, <strong>{session.user.name}</strong>
        </span>
      )}
      {links.map((link) => {

        const normalizedPath = pathname.replace(/\/$/, '') || '/';
        const normalizedHref = link.href.replace(/\/$/, '') || '/';

        const isActive = normalizedPath === normalizedHref;

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
      <LogoutButton />
    </>
  );
}
