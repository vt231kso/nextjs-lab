import { PrismaClient } from '@prisma/client';
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from 'bcryptjs';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Початок заповнення бази (Seeding) ---');

  // 1. Очищення старих даних (важливо дотримуватися черговості через зв'язки)
  await prisma.favorite.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 2. Створення користувачів
  const user1 = await prisma.user.create({
    data: {
      name: 'Софія Кашпуренко',
      email: 'sofia.k@example.com',
      password: hashedPassword,
      emailVerified: new Date(),
      bio: 'Студентка ІТ, захоплююся волейболом та кібербезпекою.',
      settings: { theme: 'light', notifications: true },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Олексій Іванов',
      email: 'alex.dev@test.com',
      password: hashedPassword,
      emailVerified: new Date(),
      bio: 'Full-stack розробник, фанат SQL та Prisma.',
      settings: { theme: 'dark', notifications: false },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Юлія Гриченко',
      email: 'student@example.com',
      password: hashedPassword,
      emailVerified: new Date(),
      bio: 'Вивчаю веб-розробку, люблю Next.js та каву.',
    },
  });

  // 3. Створення статей
  const art1 = await prisma.article.create({
    data: {
      title: 'Вступ до Next.js та Prisma 7',
      body: 'Next.js дозволяє будувати швидкі додатки, а Prisma робить роботу з базою приємною.',
      authorId: user1.id,
      comments: {
        create: [
          { name: 'Іван', email: 'ivan@kpi.ua', body: 'Дуже інформативно, дякую!' },
        ],
      },
    },
  });

  const art2 = await prisma.article.create({
    data: {
      title: 'Аналіз даних за допомогою Python',
      body: 'Pandas та SQL — це базові інструменти для будь-якого аналітика даних сьогодні.',
      authorId: user1.id,
    },
  });

  const art3 = await prisma.article.create({
    data: {
      title: 'Як працювати з Layouts у App Router',
      body: 'Вкладені лейаути дозволяють зберігати стан та уникати зайвих ререндерів.',
      authorId: user2.id,
    },
  });

  console.log('--- Додавання обраних статей для користувачів ---');

  await prisma.favorite.createMany({
    data: [
      { userId: user1.id, articleId: art1.id },
      { userId: user1.id, articleId: art3.id },
      { userId: user3.id, articleId: art1.id },
    ],
  });

  console.log(`--- Базу успішно заповнено! ---`);
}

main()
    .then(async () => {
      await prisma.$disconnect();
      await pool.end();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      await pool.end();
      process.exit(1);
    });
