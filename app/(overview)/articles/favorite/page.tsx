'use client';

import useSWR from 'swr';
import { FavoriteArticle } from '@/app/ui/articles/favorite-article';
import { FavoriteSkeleton } from '@/app/ui/articles/skeleton';
import { Alert, Box, CircularProgress } from '@mui/material';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FavoriteArticlesPage() {
  // Отримуємо список ТІЛЬКИ обраних статей через SWR
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

      {isLoading && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => <FavoriteSkeleton key={n} />)}
        </div>
      )}

      {/* Якщо список порожній */}
      {!isLoading && articles?.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[30px] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 italic text-lg">Ви ще не додали жодної статті в обране ⭐️</p>
        </div>
      )}

      {/* Список обраних статей */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article: any) => (
          <FavoriteArticle key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
