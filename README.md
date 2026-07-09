# 🎬 Movie Discovery App

Поиск и просмотр фильмов через TMDB API. Блок "Trending Movies" строится не на статике, а на реальной статистике поиска пользователей.

🔗 **Демо:** [movie-discoveryapp.vecel.app](https://movie-discoveryapp.vercel.app)

## Стек

React 19 · Vite · Tailwind CSS v4 · Appwrite (BaaS) · TMDB API · Vercel

## Фичи

- Поиск и просмотр фильмов через TMDB API
- Debounce на поиске (`react-use`) — меньше лишних запросов при вводе
- **Trending Movies** — каждый поисковый запрос логируется в Appwrite, топ-5 показывается по частоте (реальная статистика, не хардкод)
- Vercel Analytics

## Запуск

```bash
git clone https://github.com/MeshBMW/react-movie-app.git
cd react-movie-app
npm install
```

Создать `.env.local`:

```env
VITE_TMDB_API_KEY=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_ENDPOINT=
```

```bash
npm run dev
```
