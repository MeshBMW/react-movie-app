import { Link } from "react-router-dom";

// Переиспользуемая горизонтальная строка постеров.
// Используется и для "Recommended for you", и для "Similar movies" —
// разница только в заголовке и массиве фильмов, которые ей передают.
function MovieRow({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">{title}</h2>

      <ul className="flex flex-row gap-4 overflow-x-auto hide-scrollbar">
        {movies.map((movie) => (
          <li key={movie.id} className="w-[150px] shrink-0">
            <Link to={`/movies/${movie.id}`}>
              <img
                className="aspect-[2/3] w-full rounded-lg object-cover transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.04]"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                    : "/images/no-movie.png"
                }
                alt={movie.title}
              />
              <p className="mt-2 truncate text-sm font-bold text-white">
                {movie.title}
              </p>
              <p className="text-xs text-gray-100">
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieRow;
