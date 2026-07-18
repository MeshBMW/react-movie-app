const MovieGenres = ({ movie, genres }) => {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {genres.map((g) => (
          <span
            key={g.id}
            className="rounded-lg bg-primary px-3 py-1.5 text-sm text-light-200 shadow-inner shadow-light-100/10"
          >
                {g.name}
              </span>
        ))}
      </div>

      {movie.homepage && (
        <a
          href={movie.homepage}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-blue-950 px-4 py-2 text-sm text-white"
        >
          Visit Homepage
        </a>
      )}
    </div>
  )
}
export default MovieGenres