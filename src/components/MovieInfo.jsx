import MovieHeader from "./MovieHeader.jsx";
import MovieMedia from "./MovieMedia.jsx";
import MovieRow from "./MovieRow.jsx";
import MovieGenres from "./MovieGenres.jsx";
import MovieDetailsList from "./MovieDetailsList.jsx";
import MovieActors from "./MovieActors.jsx";
import { Link } from "react-router-dom";


const MovieInfo = ({
  certification, movie, releaseYear, setShowTrailer, trailer, showTrailer,
  genres, actors, similarMovies ,languages, countries, companies
}) => {
  return (
    <div className='movie-info'
    >
      <MovieHeader
        certification={certification}
        movie={movie}
        releaseYear={releaseYear}
      />
      <MovieMedia
        movie={movie}
        setShowTrailer={setShowTrailer}
        trailer={trailer}
        showTrailer={showTrailer}
      />
      <MovieGenres movie={movie} genres={genres} />
      <MovieDetailsList
        movie={movie}
        countries={countries}
        releaseYear={releaseYear}
        languages={languages}
        companies={companies}
      />
      {actors.length > 0 && (
        <MovieActors actors={actors} />
      )}
      <MovieRow title="Similar movies" movies={similarMovies} />
      <Link
        to="/"
        className="go-back-btn"
      >
        ← Back to Movies
      </Link>
    </div>
  )
}
export default MovieInfo