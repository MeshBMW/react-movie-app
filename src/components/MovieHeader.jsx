import {formatRuntime} from "../services/tmdb.js";

const MovieHeader = ({movie, releaseYear, certification}) => {
  return (
    <div className="movie-header">
      <div>
        <h2>{movie.title}</h2>
        <p>
          {releaseYear ? releaseYear.split("-")[0] : "N/A"}
          {certification && <> · {certification}</>}
          {movie.runtime ? <> · {formatRuntime(movie.runtime)}</> : null}
        </p>
      </div>

      <div className="movie-rating">
        <span className="text-amber-400">★</span>
        <span className="text-sm font-bold text-white">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
            </span>
        <span className="text-xs text-gray-100">
              ({movie.vote_count ? `${Math.round(movie.vote_count / 1000)}K` : "N/A"})
            </span>
      </div>
    </div>
  )
}
export default MovieHeader