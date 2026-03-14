"use client";

import { signOut } from "next-auth/react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Іконка виходу
import styles from './nav-links.module.css'; // Використовуємо твої стилі
import clsx from 'clsx';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={clsx(styles.link)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#d32f2f', // Червоний колір для акценту на виході
        marginTop: 'auto', // Виштовхне кнопку в самий низ панелі
        padding: '12px'
      }}
    >
      <ExitToAppIcon />
      <span>Sign Out</span>
    </button>
  );
}
