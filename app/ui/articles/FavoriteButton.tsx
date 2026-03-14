'use client';
import { useState } from 'react';

export default function FavoriteButton({
                                         articleId,
                                         initialIsFavorite
                                       }: {
  articleId: number,
  initialIsFavorite: boolean
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/articles/favorite/toggle', {
        method: 'POST',
        body: JSON.stringify({ articleId }),
      });
      const data = await res.json();
      setIsFavorite(data.isFavorite);
    } catch (err) {
      console.error("Помилка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
    >
      {isFavorite ? '❤️ В обраному' : '🤍 Додати в обране'}
    </button>
  );
}
