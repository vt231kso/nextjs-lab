"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) return { success: false };

  const name = formData.get("name") as string;
  const age = parseInt(formData.get("age") as string) || null;
  const bio = formData.get("bio") as string;

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
      age,
      bio,
    },
  });

  revalidatePath("/profile");
  return { success: true };
}
