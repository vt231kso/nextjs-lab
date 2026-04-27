import { GET } from '@/app/api/articles/favorite/route';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    favorite: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

describe('Favorites API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET повертає 401 для неавторизованого гостя', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it('GET повертає список обраного для юзера', async () => {
    (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });
    (prisma.favorite.findMany as jest.Mock).mockResolvedValue([
      { article: { id: 10, title: 'Fav' } }
    ]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(prisma.favorite.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 1 }
      })
    );
  });
});
