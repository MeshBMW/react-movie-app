import MovieTrailer from "./MovieTrailer.jsx";

const MovieMedia = ({ movie, showTrailer, trailer, setShowTrailer }) => {
  return (
    <div className="movie-media">
      <img
        className="movie-img"
        src={movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "/images/no-movie.png"
      }
        alt={movie.title}
      />

      <MovieTrailer
        movie={movie}
        showTrailer={showTrailer}
        trailer={trailer}
        setShowTrailer={setShowTrailer}
      />
    </div>
  )
}
export default MovieMedia