const MovieTrailer = ({ movie, trailer, setShowTrailer, showTrailer }) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-primary">
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
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-100">
          No backdrop available
        </div>
      )}

      {trailer && !showTrailer && (
        <button
          onClick={() => setShowTrailer(true)}
          className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-primary/70
            px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-primary/90"
        >
          ▶ Trailer
        </button>
      )}

      {showTrailer && (
        <button
          onClick={() => setShowTrailer(false)}
          aria-label="Close trailer"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full
            bg-primary/70 text-white transition-colors  hover:bg-primary/90"
        >
          ✕
        </button>
      )}
    </div>
  )
}
export default MovieTrailer