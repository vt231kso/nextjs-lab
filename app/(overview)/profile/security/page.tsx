// app/profile/security/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SecurityForm from "../../../ui/profile/SecurityForm";

export default async function SecurityPage() {
  const session = await auth();

  // Шукаємо користувача, щоб перевірити, чи є в нього пароль
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
    select: { password: true } // Беремо тільки пароль для перевірки
  });

  const isSocialUser = !user?.password;

  return (
    <div className="max-w-4xl mx-auto p-10 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10">Безпека</h1>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        {isSocialUser ? (
          /* Якщо пароля в БД нема — показуємо це повідомлення */
          <div className="text-center py-10">
            <div className="text-5xl mb-4">G</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ви увійшли через Google</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Ваш акаунт захищено за допомогою Google. Керування паролем здійснюється в налаштуваннях вашого Google-акаунту.
            </p>
            <a
              href="https://myaccount.google.com/security"
              target="_blank"
              className="mt-6 inline-block text-blue-600 font-semibold hover:underline"
            >
              Перейти до налаштувань Google →
            </a>
          </div>
        ) : (
          /* Якщо пароль є — показуємо форму зміни */
          <>
            <h3 className="text-xl font-semibold mb-6">Зміна пароля</h3>
            <SecurityForm />
          </>
        )}
      </div>
    </div>
  );
}
