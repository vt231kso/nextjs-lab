"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function changePassword(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Не авторизовано" };

  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    return { error: "Нові паролі не збігаються" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || !user.password) {
    return { error: "Користувача не знайдено або ви зайшли через соцмережі" };
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return { error: "Старий пароль невірний" };
  }


  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashedPassword },
  });

  revalidatePath("/profile/security");
  return { success: "Пароль успішно змінено!" };
}
