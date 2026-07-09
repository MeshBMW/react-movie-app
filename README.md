# 🎬 Movie Discovery App

Поиск и просмотр фильмов через TMDB API. Блок "Trending Movies" строится не на статике, а на реальной статистике поиска пользователей.
## Скриншоты 
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/acc58f69-fe1f-45e6-87df-1580819e0185" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/4188b503-85de-46e1-8131-caaf64280bcd" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/14c0610a-da05-4f55-8f00-eb6c6205c523" />





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
