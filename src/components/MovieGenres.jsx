const MovieGenres = ({ movie, genres }) => {
  return (
    <div className="movie-genres-list">
      <div>
        {genres.map((g) => (
          <span
            key={g.id}
            className="genre-names"
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
        >
          Visit Homepage
        </a>
      )}
    </div>
  )
}
export default MovieGenres