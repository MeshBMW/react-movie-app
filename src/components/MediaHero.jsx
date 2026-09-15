import { formatRuntime } from "../services/tmdb.js";
import { useFavoritesContext } from "../utils/FavoritesContext.jsx";

const MediaHero = ({ movie, mediaType, releaseYear, certification, genres,
  trailer, showTrailer, setShowTrailer, directors=[]
}) => {
  const displayTitle = movie.title ?? movie.name;
  const runtimeMinutes = mediaType === 'tv' ? movie.episode_run_time?.[0] : movie.runtime;
  const genreNames = genres.map((g) => g.name).join(", ");

  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favourite = isFavorite(movie.id);

  return (
    <div className="movie-hero">
      {showTrailer && trailer ? (
        <iframe
          className="movie-hero-media"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : movie.backdrop_path ? (
        <img
          className="movie-hero-media"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={`${displayTitle} backdrop`}
          loading={'lazy'}
        />
      ) : null}

      {!showTrailer && <div className="movie-hero-overlay" />}

      {showTrailer && (
        <button onClick={() => setShowTrailer(false)} className="close-trailer-btn-hero" aria-label="Close trailer">✕</button>
      )}

      {!showTrailer && (
        <div className="movie-hero-content">
          <h1>{displayTitle}</h1>
          <p className="movie-hero-meta">
            {certification && <span className="cert-badge">{certification}</span>}
            {releaseYear && <span>{releaseYear.split("-")[0]}</span>}
            {runtimeMinutes ? <span>{formatRuntime(runtimeMinutes)}</span> : null}
            {genreNames && <span>{genreNames}</span>}
          </p>
          <div className="movie-hero-rating">
            <span className="text-amber-400">★</span>
            <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10</span>
            <span className='text-sm text-cyan-800'>
              ({movie.vote_count && movie.vote_count > 999 ? `${Math.round(movie.vote_count / 1000)}K` : `${movie.vote_count}` || 'N/A'})
            </span>
          </div>
          <div className="movie-hero-actions">
            {trailer && (
              <button onClick={() => setShowTrailer(true)} className="show-trailer-btn-hero">
                ▶ Watch Trailer
              </button>
            )}
            <button
              onClick={() => toggleFavorite(movie, mediaType)}
              className="watchlist-btn-hero"
              disabled={true}
              aria-label={favourite ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              🔖 {favourite ? "In Watchlist" : "Add to Watchlist"}
            </button>
          </div>

          {movie.overview && <p
            className="movie-hero-overview"
            onClick={() => {}}>
            {movie.overview}
          </p>
          }
          {directors.length > 0 && (
            <p className="movie-hero-directors">Directed by {directors.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  )
}
export default MediaHero