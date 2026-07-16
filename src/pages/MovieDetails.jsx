import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import { Link, useParams } from "react-router-dom";
import { getMovieById, getTrailer, getCertification } from "../services/tmdb.js";
import MovieInfo from "../components/MovieInfo.jsx";


// movieId / onBack — опциональные пропсы для модалки.
// Без них компонент сам берёт id из роута (/movies/:id) и рендерит Link вместо кнопки.
function MovieDetails({ movieId: movieIdProp, onBack }) {
  const params = useParams();
  const movieId = movieIdProp ?? params.id;

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const trailer = movie ? getTrailer(movie.videos) : null;
  const certification = movie ? getCertification(movie.release_dates) : null;

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      setErrorMessage("");
      setShowTrailer(false);

      try {
        const movieData = await getMovieById(movieId);
        setMovie(movieData);
      } catch (error) {
        console.log(`Error fetching movie details: ${error}`);
        setErrorMessage("Failed to fetch movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const BackControl = () =>
    onBack ? (
      <button
        className="cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white"
        onClick={onBack}
      >
        Back to movies
      </button>
    ) : (
      <Link
        to="/"
        className="inline-block rounded-lg bg-blue-950 px-4 py-2 text-white"
      >
        ← Back to Movies
      </Link>
    );

  if (isLoading) {
    return (
      <section className="mt-10">
        <BackControl />
        <div className="mt-6">
          <Spinner />
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="mt-10 space-y-6">
        <BackControl />
        <p className="text-red-500">{errorMessage}</p>
      </section>
    );
  }

  if (!movie) return null;

  const releaseYear = movie.release_date;
  const genres = movie.genres || [];
  const actors = movie.credits?.cast?.slice(0, 9) || [];
  const languages =
    movie.spoken_languages?.map((l) => l.english_name).join(" · ") ||
    movie.original_language?.toUpperCase() ||
    "N/A";
  const countries = movie.production_countries?.map((c) => c.name).join(" · ") || "N/A";
  const companies = movie.production_companies?.map((c) => c.name).join(" · ") || "N/A";
  const similarMovies = movie.similar?.results?.slice(0, 10) || [];

  return (
    <section className="mt-10 space-y-6">
      <MovieInfo
        releaseYear={releaseYear}
        movie={movie}
        genres={genres}
        actors={actors}
        languages={languages}
        countries={countries}
        companies={companies}
        certification={certification}
        setShowTrailer={setShowTrailer}
        trailer={trailer}
        showTrailer={showTrailer}
        similarMovies={similarMovies}
      />
    </section>
  );
}
export default MovieDetails;