import MediaHero from "./MediaHero.jsx";
import MediaRow from "./MediaRow.jsx";
import MediaDetailsList from "./MediaDetailsList.jsx";
import MovieActors from "./MovieActors.jsx";
import { Link } from "react-router-dom";

const MovieInfo = ({
  mediaType, certification, movie, releaseYear, setShowTrailer, trailer, showTrailer,
  genres, actors, similarMovies, languages, countries, companies, directors
}) => {
  return (
    <div className='movie-info'>
      <MediaHero
        movie={movie}
        mediaType={mediaType}
        releaseYear={releaseYear}
        certification={certification}
        genres={genres}
        trailer={trailer}
        showTrailer={showTrailer}
        setShowTrailer={setShowTrailer}
        directors={directors}
      />

      <div className="movie-info-body">
        <MediaDetailsList
          movie={movie}
          mediaType={mediaType}
          countries={countries}
          releaseYear={releaseYear}
          languages={languages}
          companies={companies}
        />
        {actors.length > 0 && <MovieActors actors={actors} />}
        <MediaRow
          title={mediaType === 'tv' ? "Similar shows" : "Similar movies"}
          items={similarMovies}
          mediaType={mediaType}
        />
        <Link to="/" className="go-back-btn">← Back to Home</Link>
      </div>
    </div>
  )
}
export default MovieInfo