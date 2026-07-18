import { useEffect, useState } from "react";

const STORAGE_KEY = "favorite-movies";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      isFavorite(movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return { favorites, isFavorite, toggleFavorite };
}