import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { articleId } = await req.json();
    const userId = Number(session.user.id);


    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_articleId: { userId, articleId }
      }
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      });
      return NextResponse.json({ isFavorite: false });
    } else {
      await prisma.favorite.create({
        data: { userId, articleId }
      });
      return NextResponse.json({ isFavorite: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
