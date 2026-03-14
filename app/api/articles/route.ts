// import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {auth} from "@/auth";


export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        comments: true,
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Помилка при отриманні статтей" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    // 1. Перевірка авторизації
    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизовано" }, { status: 401 });
    }

    const body = await request.json();

    // 2. Валідація полів
    if (!body.title || !body.body) {
      return NextResponse.json({ error: "Заголовок та зміст обов'язкові" }, { status: 400 });
    }

    // 3. Створення статті
    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        body: body.body,
        // Поле isFavorite видалено звідси, бо його більше немає в моделі Article
        authorId: Number(session.user.id), // Беремо ID того, хто зараз залогінений
      },
      include: {
        author: true, // Повертаємо статтю разом з об'єктом автора
      }
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("CREATE ARTICLE ERROR:", error);
    return NextResponse.json(
        { error: "Не вдалося створити статтю." },
        { status: 500 }
    );
  }
}
