import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
//
// const connectionString = `${process.env.DATABASE_URL}`;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({ adapter });

// 1. GET - Отримати одну конкретну статтю з її автором та коментарями
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Некоректний формат ID" }, { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        author: true,   // Додаємо профіль автора
        comments: true, // Додаємо список коментарів
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Статтю не знайдено" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Помилка бази даних" }, { status: 500 });
  }
}

// 2. PATCH - Оновити статтю
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const articleId = Number(id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Некоректний формат ID" }, { status: 400 });
    }

    const updated = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: body.title,
        body: body.body,
        isFavorite: body.isFavorite,
        // Якщо треба змінити автора статті:
        ...(body.authorId && { authorId: Number(body.authorId) })
      },
      include: {
        author: true // Щоб одразу бачити оновлені дані автора
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Статтю не знайдено або помилка оновлення" }, { status: 500 });
  }
}

// 3. DELETE - Видалити статтю
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Некоректний формат ID" }, { status: 400 });
    }

    // Завдяки onDelete: Cascade у схемі, коментарі видаляться автоматично
    await prisma.article.delete({
      where: { id: articleId },
    });

    return NextResponse.json({ message: "Статтю та її коментарі успішно видалено" });
  } catch (error) {
    return NextResponse.json({ error: "Не вдалося видалити статтю" }, { status: 500 });
  }
}
