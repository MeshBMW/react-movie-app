const MovieTrailer = ({ movie, trailer, setShowTrailer, showTrailer }) => {
  return (
    <div className="movie-trailer">
      {showTrailer && trailer ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : movie.backdrop_path ? (
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
        />
      ) : (
        <div className="no-backdrop">No backdrop available</div>
      )}

      {trailer && !showTrailer && (
        <button
          onClick={() => setShowTrailer(true)}
          aria-label="Show trailer"
          className="show-trailer-btn"
        >
          ▶ Trailer
        </button>
      )}

      {showTrailer && (
        <button
          onClick={() => setShowTrailer(false)}
          aria-label="Close trailer"
          className="close-trailer-btn"
        >
          ✕
        </button>
      )}
    </div>
  )
}
export default MovieTrailer