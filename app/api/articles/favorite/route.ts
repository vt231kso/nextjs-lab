
import {NextResponse} from "next/server";
import {auth} from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();


    console.log("FULL SESSION OBJECT:", JSON.stringify(session, null, 2));

    if (!session?.user) {
      return NextResponse.json({ error: 'Неавторизований доступ' }, { status: 401 });
    }

    const rawId = session.user?.id;

    if (!rawId) {
      console.error("ID NOT FOUND IN SESSION");
      return NextResponse.json({ error: 'ID користувача не знайдено в сесії' }, { status: 400 });
    }

    const userId = Number(rawId);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'ID користувача не є числом' }, { status: 400 });
    }

    const favoriteEntries = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      include: {
        article: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    const favoriteArticles = favoriteEntries.map(fav => fav.article);
    return NextResponse.json(favoriteArticles);

  } catch (error) {
    console.error("GET Favorites Error:", error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
