import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma';
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    ...authConfig.providers.filter(p => p.id !== "credentials"),

    Credentials({
      async authorize(credentials) {
        console.log("=== ПЕРЕВІРКА ЗАПУСТИЛАСЯ ===");

        if (!credentials?.email || !credentials?.password) {
          console.log("Відсутній email або пароль");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          console.log("Користувача не знайдено або він Google-user");
          return null;
        }

        console.log("Введено пароль:", credentials.password);
        console.log("Хеш з бази:", user.password);

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        console.log("Результат порівняння:", isPasswordCorrect);

        if (isPasswordCorrect) {
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
