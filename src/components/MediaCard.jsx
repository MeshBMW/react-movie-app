import { Link } from "react-router-dom";
import useRipple from "../hooks/useRipple.js";
import { useFavoritesContext } from "../utils/FavoritesContext.jsx";

const MediaCard = ({ media, mediaType, layout = "poster" }) => {
  const { poster_path, backdrop_path, id } = media;
  const type = mediaType ?? media.media_type ?? 'movie';
  const isHorizontal = layout === "horizontal";

  const displayTitle = media.title ?? media.name;
  const dateStr = media.release_date ?? media.first_air_date;

  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favourite = isFavorite(id);
  const handleClick = useRipple();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(media, type);
  };

  const imageSrc = isHorizontal
    ? (backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}` : "/images/no-movie.png")
    : (poster_path ? `https://image.tmdb.org/t/p/w400/${poster_path}` : "/images/no-movie.png");

  return (
    <Link to={`/${type}/${id}`}>
      <div className={isHorizontal ? "movie-card movie-card-horizontal" : "movie-card"} onClick={handleClick}>
        <img src={imageSrc} alt={displayTitle} />

        <div className="mt-3">
          <h3>{displayTitle}</h3>
          <div className="content">
            <p className="year">
              {dateStr ? dateStr.split("-")[0] : "N/A"}
              {type === 'tv' && <span className="badge md:px-1.5 md:text-[14px] text-[12px] px-1 mx-0.5 bg-blue-950 rounded-full border border-cyan-900">TV</span>}
            </p>
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