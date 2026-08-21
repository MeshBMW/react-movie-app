import { Link } from "react-router-dom";

function MovieRow({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                className="similar-movies-img"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
                    : "/images/no-movie.png"
                }
                alt={movie.title}
              />
              <p className="movie-title">{movie.title}</p>
              <p className="movie-review">
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