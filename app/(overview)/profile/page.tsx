import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "../../ui/profile/ProfileForm";

export default async function ProfilePage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string }
  });
  console.log(user);

  if (!user) return <p>Користувача не знайдено</p>;

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Мій профіль</h1>

      <div className="bg-white shadow-md rounded-lg p-6 border">
        <p className="mb-4 text-gray-600">
          Тут ви можете змінити свою особисту інформацію.
        </p>

        <ProfileForm user={user} />
      </div>
    </div>
  );
}
