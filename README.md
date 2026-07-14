# 🎬 Movie Discovery App

Movie Discovery App — React-приложение для поиска и просмотра фильмов через TMDB API с системой популярных запросов, построенной на Appwrite.
## Скриншоты 
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/29490b68-1c32-4355-a11c-a2fe2c8d22df" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/597110bf-0849-48db-b1b3-40adfaddbf66" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/73345d89-670e-451f-ba74-81a35f9c5f87" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/c685664f-68a2-41b3-be6b-5c17d892260b" />

🔗 **Демо:** [movie-discoveryapp.vecel.app](https://movie-discoveryapp.vercel.app)

## Стек

· React 19 
· Vite 
· Tailwind CSS v4 
· Appwrite (BaaS) 
· TMDB API 
· Vercel

## Что было реализовано

- Работа с REST API
- Debouncing запросов
- Интеграция BaaS (Appwrite)
- Управление состоянием React
- Адаптивная верстка
- Environment Variables
- Деплой на Vercel

## Как работает Trending

Каждый поисковый запрос сохраняется в Appwrite.

При повторных запросах счетчик увеличивается.

Главная страница показывает Top 5 фильмов по количеству поисков пользователей.

Таким образом блок Trending строится на реальной активности пользователей.

## Архитектура

```text
src/
├── components/
│   ├── AllMovies.jsx
│   ├── MovieCard.jsx
│   ├── MovieDetails.jsx
│   ├── Search.jsx
│   ├── Spinner.jsx
│   └── Wrapper.jsx
├── services/
│   └── appwrite.js
├── App.jsx
├── HomePage.jsx
├── main.jsx
└── index.css
```
 
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
This project is for educational purposes.
