import { GET, PATCH, DELETE } from '@/app/api/articles/[id]/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    article: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('Article by ID API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET повертає статтю, якщо вона існує', async () => {
    (prisma.article.findUnique as jest.Mock).mockResolvedValue({ id: 1, title: 'Test' });

    const res = await GET(new Request('http://localhost'), {
      params: Promise.resolve({ id: '1' }),
    });

    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.id).toBe(1);
  });

  it('GET повертає 400, якщо ID не є числом', async () => {
    const res = await GET(new Request('http://localhost'), {
      params: Promise.resolve({ id: 'abc' }),
    });

    expect(res.status).toBe(400);
  });

  it('PATCH оновлює статтю', async () => {
    (prisma.article.update as jest.Mock).mockResolvedValue({ id: 1, title: 'Updated' });

    const req = new Request('http://localhost', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated' }),
    });

    const res = await PATCH(req, {
      params: Promise.resolve({ id: '1' }),
    });

    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.title).toBe('Updated');
  });

  it('DELETE видаляє статтю', async () => {
    (prisma.article.delete as jest.Mock).mockResolvedValue({ id: 1 });

    const res = await DELETE(new Request('http://localhost'), {
      params: Promise.resolve({ id: '1' }),
    });

    expect(res.status).toBe(200);
  });
});
