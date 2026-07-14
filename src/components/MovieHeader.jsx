import {formatRuntime} from "../services/tmdb.js";

const MovieHeader = ({movie, releaseYear, certification}) => {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {movie.title}
        </h2>
        <p className="mt-1 text-sm text-gray-100">
          {releaseYear ? releaseYear.split("-")[0] : "N/A"}
          {certification && <> · {certification}</>}
          {movie.runtime ? <> · {formatRuntime(movie.runtime)}</> : null}
        </p>
      </div>

      <div className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 shadow-inner shadow-light-100/10">
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