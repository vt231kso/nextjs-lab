'use client';

import useSWR from 'swr';
import { FavoriteArticle } from '@/app/ui/articles/favorite-article';
import { FavoriteSkeleton } from '@/app/ui/articles/skeleton';
import { Alert, Box } from '@mui/material';


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Помилка завантаження');
  }
  return res.json();
};

export default function FavoriteArticlesPage() {
  // Зверни увагу на шлях: він має бути таким же, як назва папки в api
  const { data: articles, error, isLoading } = useSWR('/api/articles/favorite', fetcher);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Box className="mb-10 text-left">
        <h1 className="text-3xl xs:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] bg-clip-text text-transparent">
            Мої улюблені статті
          </span>
        </h1>
        <div className="mt-2 h-1.5 w-20 rounded-full bg-[#facc15]" />
      </Box>

      {/* Повідомлення про помилку (наприклад, не авторизований) */}
      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: '16px' }}>
          {error.message === 'Неавторизований доступ'
            ? 'Будь ласка, увійдіть в акаунт, щоб бачити свої обрані статті 🔑'
            : 'Не вдалося завантажити список статей 🛠️'}
        </Alert>
      )}

      {!error && (
        <Alert
          severity="info"
          variant="outlined"
          sx={{
            mb: 6,
            borderRadius: '16px',
            borderColor: '#1e40af',
            color: '#1e40af',
            backgroundColor: 'rgba(30, 64, 175, 0.03)',
            '& .MuiAlert-icon': { color: '#facc15' }
          }}
        >
          Тут зібрані ваші збережені статті ✨
        </Alert>
      )}

      {/* Скелетони під час завантаження */}
      {isLoading && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => <FavoriteSkeleton key={n} />)}
        </div>
      )}

      {/* Якщо список порожній */}
      {!isLoading && !error && articles?.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[30px] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 italic text-lg">Ви ще не додали жодної статті в обране ⭐️</p>
        </div>
      )}

      {/* Список статей */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article: any) => (
          <FavoriteArticle key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
