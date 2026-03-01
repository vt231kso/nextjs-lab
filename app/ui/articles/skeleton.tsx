// app/ui/skeletons.tsx
export function FavoriteSkeleton() {
  return (
    <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 animate-pulse">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
      <div className="h-20 w-full bg-gray-200 rounded"></div>
    </div>
  );
}
