import MovieHeader from "./MovieHeader.jsx";
import MovieIMG from "./MovieIMG.jsx";
import MovieRow from "./MovieRow.jsx";
import MovieGenres from "./MovieGenres.jsx";
import MovieDetailsList from "./MovieDetailsList.jsx";
import MovieActors from "./MovieActors.jsx";
import { Link } from "react-router-dom";

const InfoRow = ({ label, children }) => (
  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
    <span className="shrink-0 text-sm text-gray-100 sm:w-36">{label}</span>
    <span className="text-sm text-light-100">{children}</span>
  </div>
)

const MovieInfo = ({
  certification, movie, releaseYear, setShowTrailer, trailer, showTrailer,
  genres, actors, similarMovies ,languages, countries, companies
}) => {
  return (
    <div className="mx-auto max-w-7xl rounded-4xl border border-light-100/10
    bg-dark-100 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] fade-in-up sm:p-10"
    >
      <MovieHeader
        certification={certification}
        movie={movie}
        releaseYear={releaseYear}
      />
      <MovieIMG
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
        InfoRow={InfoRow}
      />
      {actors.length > 0 && (
        <MovieActors actors={actors} />
      )}
      <MovieRow title="Similar movies" movies={similarMovies} />
      <Link
        to="/"
        className="rounded-lg max-w-100 bg-blue-95 px-4 py-2 text-white
        mt-10 flex flex-row items-center justify-center"
      >
        ← Back to Movies
      </Link>
    </div>
  )
}
export default MovieInfo