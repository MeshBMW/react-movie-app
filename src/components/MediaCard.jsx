import { Link } from "react-router-dom";
import useRipple from "../hooks/useRipple.js";
import { useFavoritesContext } from "../utils/FavoritesContext.jsx";

const MediaCard = ({ media, mediaType }) => {
  const { poster_path, vote_average, original_language, id } = media;
  const type = mediaType ?? media.media_type ?? 'movie';

  const displayTitle = media.title ?? media.name;
  const dateStr = media.release_date ?? media.first_air_date;

  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favourite = isFavorite(id);
  const handleClick = useRipple();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(media, type);
    // in development
  };

  return (
    <Link to={`/${type}/${id}`}>
      <div className="movie-card" onClick={handleClick}>
        <img
          src={poster_path
            ? `https://image.tmdb.org/t/p/w400/${poster_path}`
            : "/images/no-movie.png"
          }
          alt={displayTitle}
        />

        <div className="mt-3">
          <h3>{displayTitle}</h3>
          <div className="content">
            {/*<div className="rating">*/}
            {/*  <img src="/star.svg" alt="Star Icon" />*/}
            {/*  <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>*/}
            {/*</div>*/}
            <p className="year">{dateStr ? dateStr.split("-")[0] : "N/A"}</p>
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
export default MediaCard;