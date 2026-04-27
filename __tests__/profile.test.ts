import { updateProfile } from '@/app/actions/userActions';
import { changePassword } from '@/app/actions/authActions';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      update: jest.fn(),
    },
  },
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Profile actions', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updateProfile успішно оновлює дані', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { email: 'test@test.com', id: 1 },
    });

    (prisma.user.update as jest.Mock).mockResolvedValue({ id: 1 });

    const formData = new FormData();
    formData.append('name', 'Sofia');

    const res = await updateProfile(formData);

    expect(res.success).toBe(true);
    expect(prisma.user.update).toHaveBeenCalled();
  });

  it('changePassword помилка якщо паролі не співпадають', async () => {
    const formData = new FormData();
    formData.append('newPassword', '123456');
    formData.append('confirmPassword', '654321');

    const res = await changePassword(formData);

    expect(res.error).toBeDefined();
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

});
