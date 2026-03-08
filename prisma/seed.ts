import { PrismaClient } from '@prisma/client';
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Початок заповнення бази (Seeding) ---');


  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.profile.deleteMany();


  const user1 = await prisma.profile.create({
    data: {
      name: 'Софія Кашпуренко',
      email: 'sofia.k@example.com',
      bio: 'Студентка ІТ, захоплююся волейболом та кібербезпекою.',
      settings: { theme: 'light', notifications: true },
    },
  });

  const user2 = await prisma.profile.create({
    data: {
      name: 'Олексій Іванов',
      email: 'alex.dev@test.com',
      bio: 'Full-stack розробник, фанат SQL та Prisma.',
      settings: { theme: 'dark', notifications: false },
    },
  });

  const user3 = await prisma.profile.create({
    data: {
      name: 'Юлія Гриченко',
      email: 'student@example.com',
      bio: 'Вивчаю веб-розробку, люблю Next.js та каву.',
    },
  });


  await prisma.article.create({
    data: {
      title: 'Вступ до Next.js та Prisma 7',
      body: 'Next.js дозволяє будувати швидкі додатки, а Prisma робить роботу з базою приємною.',
      isFavorite: true,
      authorId: user1.id,
      comments: {
        create: [
          { name: 'Іван', email: 'ivan@kpi.ua', body: 'Дуже інформативно, дякую!' },
          { name: 'Марина', email: 'mary@dev.com', body: 'Чи плануєте статтю про Server Actions?' },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Аналіз даних за допомогою Python',
      body: 'Pandas та SQL — це базові інструменти для будь-якого аналітика даних сьогодні.',
      isFavorite: true,
      authorId: user1.id,
      comments: {
        create: [
          { name: 'Артем', email: 'artem@data.io', body: 'SQL у вашому прикладі дуже зрозумілий.' },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Як працювати з Layouts у App Router',
      body: 'Вкладені лейаути дозволяють зберігати стан та уникати зайвих ререндерів.',
      isFavorite: false,
      authorId: user2.id,
      comments: {
        create: [
          { name: 'Сергій', email: 'serg@kpi.ua', body: 'Нарешті розібрався з вкладеністю!' },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Основи OSINT для початківців',
      body: 'Відкриті джерела дозволяють знайти неймовірну кількість інформації, якщо знати, де шукати.',
      isFavorite: false,
      authorId: user3.id,
      comments: {
        create: [
          { name: 'Дмитро', email: 'dima@cyber.security', body: 'Крута тема, чекаю продовження про Shodan.' },
        ],
      },
    },
  });

  console.log(`--- Базу успішно заповнено! ---`);
  console.log(`Створено профілів: 3`);
  console.log(`Створено статтей: 4`);
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
