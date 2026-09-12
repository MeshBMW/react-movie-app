import { formatRuntime } from "../services/tmdb.js";

const MovieHeader = ({ movie, mediaType, releaseYear, certification }) => {
  const displayTitle = movie.title ?? movie.name;
  const runtimeMinutes = mediaType === 'tv' ? movie.episode_run_time?.[0] : movie.runtime;

  return (
    <div className="movie-header">
      <div>
        <h2>{displayTitle}</h2>
        <p>
          {releaseYear ? releaseYear.split("-")[0] : "N/A"}
          {certification && <> · {certification}</>}
          {runtimeMinutes ? <> · {formatRuntime(runtimeMinutes)}</> : null}
        </p>
      </div>
      <div className="movie-rating">
        <span className="text-amber-400">★</span>
        <span className="text-sm font-bold text-white">
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
        </span>
        <span className="text-xs text-gray-100">
          ({movie.vote_count && movie.vote_count > 999 ? `${Math.round(movie.vote_count / 1000)}K` : `${movie.vote_count}` || 'N/A'})
        </span>
      </div>
    </div>
  )
}
export default MovieHeader