import { Link } from "react-router-dom";
import useRipple from "../hooks/useRipple.js";
import { useFavoritesContext } from "../utils/FavoritesContext.jsx";

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, vote_average, original_language, id } = movie;

  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favourite = isFavorite(id);
  const handleClick = useRipple();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
    // in development
  };

  return (
    <Link to={`/movies/${id}`}>
      <div className="movie-card" onClick={handleClick}>
        <img
          src={poster_path
              ? `https://image.tmdb.org/t/p/w400/${poster_path}`
              : "/images/no-movie.png"
          }
          alt={title}
        />

        <div className="mt-3">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="/star.svg" alt="Star Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
              <p className="lang">{original_language}</p>
              <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
            <button
              className="like-btn invisible"
              onClick={handleFavoriteClick}
              aria-label={favourite ? "Remove from favorites" : "Add to favorites"}
              disabled={true}
            ></button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;