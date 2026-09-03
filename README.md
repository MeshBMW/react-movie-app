# 🎬 Movie Discovery App

Trailer Finder — React-приложение для поиска и просмотра фильмов через TMDB API с системой популярных запросов, построенной на Appwrite.
## Скриншоты 
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/29490b68-1c32-4355-a11c-a2fe2c8d22df" />
<img width="1920" height="1080" alt="изображение" src="https://github.com/user-attachments/assets/597110bf-0849-48db-b1b3-40adfaddbf66" />
<img width="1920" height="1000" alt="изображение" src="https://github.com/user-attachments/assets/c427d639-259c-41b8-96e4-2e0bb2110e7d" />
<img width="1920" height="803" alt="изображение" src="https://github.com/user-attachments/assets/7aee8dde-423d-4e00-a3cf-12057182005b" />

🔗 **Демо:** [trailer-finder.vecel.app](https://movie-discoveryapp.vercel.app)

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
- Skeleton Loader
- Пагинация

## Как работает Trending

Каждый поисковый запрос сохраняется в Appwrite.

При повторных запросах счетчик увеличивается.

Главная страница показывает Топ 5 фильмов по количеству поисков пользователей.

Таким образом блок Trending строится на реальной активности пользователей.

## Архитектура

```text
src/
├── components/
├── hooks/
├── pages/
├── services/
├── utils/
├── App.jsx
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
VITE_API_BASE_URL=
```

```bash
npm run dev
```
This project is for educational purposes.
