'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
    },
    secondary: {
      main: '#f59e0b',
    },
  },
  shape: {
    borderRadius: 14,
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <html lang="en">
    <body>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
    </body>
    </html>
    </SessionProvider>
  );
}
