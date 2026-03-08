import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const favoriteArticles = await prisma.article.findMany({
      where: {
        isFavorite: true,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(favoriteArticles);
  } catch (error) {
    return NextResponse.json({ error: 'Помилка завантаження обраних статей' }, { status: 500 });
  }
}
