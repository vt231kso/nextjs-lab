// app/(overview)/articles/favorite/page.tsx
import { Suspense } from 'react';
import { FavoriteArticle } from '@/app/ui/articles/favorite-article';
import { FavoriteSkeleton } from '@/app/ui/articles/skeleton';
import { Alert, Box } from '@mui/material';

export default function FavoriteArticlesPage() {
  const ids = [7, 5, 10];

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

      {/* Стилізований MUI Alert */}
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

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((id) => (
          <Suspense key={id} fallback={<FavoriteSkeleton />}>
            <FavoriteArticle id={id} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
