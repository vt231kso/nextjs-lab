// import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


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
    const body = await request.json();


    if (!body.authorId) {
      return NextResponse.json({ error: "authorId є обов'язковим полем" }, { status: 400 });
    }

    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        body: body.body,
        isFavorite: body.isFavorite || false,
        authorId: Number(body.authorId),
      },
      include: {
        author: true,
      }
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Не вдалося створити статтю. Переконайтеся, що такий authorId існує в базі." },
      { status: 500 }
    );
  }
}
