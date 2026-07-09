# 🎬 Movie Discovery App

Поиск и просмотр фильмов через TMDB API. Блок "Trending Movies" строится не на статике, а на реальной статистике поиска пользователей.
## Скриншоты 
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/29490b68-1c32-4355-a11c-a2fe2c8d22df" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/e976b158-bdb9-4928-8bb5-5e8c4917a41c" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/84e921c1-a6de-4437-92ba-a492f9dce6b3" />

🔗 **Демо:** [movie-discoveryapp.vecel.app](https://movie-discoveryapp.vercel.app)

## Стек

React 19 · Vite · Tailwind CSS v4 · Appwrite (BaaS) · TMDB API · Vercel

## Фичи

- Поиск и просмотр фильмов через TMDB API
- Debounce на поиске (`react-use`) — меньше лишних запросов при вводе
- **Trending Movies** — каждый поисковый запрос логируется в Appwrite, топ-5 показывается по частоте (реальная статистика, не хардкод)
- Адаптивный UI(mobile-first)

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
