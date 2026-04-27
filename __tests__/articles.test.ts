import { GET, POST } from '@/app/api/articles/route';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    article: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

describe('Articles General API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET повертає список статей', async () => {
    (prisma.article.findMany as jest.Mock).mockResolvedValue([{ id: 1, title: 'Test' }]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
  });

  it('POST повертає 401 без авторизації', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ title: 'Title', body: 'Body' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('POST успішно створює статтю для авторизованого користувача', async () => {
    (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } }); // ID як Int згідно схеми
    (prisma.article.create as jest.Mock).mockResolvedValue({ id: 1, title: 'New' });

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ title: 'New', body: 'Content' }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.title).toBe('New');
  });
});
