import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import { useParams } from "react-router-dom";
import { getMediaById, getTrailer, getCertification, getTVCertification } from "../services/tmdb.js";
import MovieInfo from "../components/MovieInfo.jsx";

function MovieDetails({ mediaType: mediaTypeProp, mediaId: mediaIdProp }) {
  const params = useParams();
  const mediaType = mediaTypeProp ?? params.mediaType ?? 'movie';
  const mediaId = mediaIdProp ?? params.id;

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const trailer = movie ? getTrailer(movie.videos) : null;
  const certification = movie
    ? (mediaType === 'tv' ? getTVCertification(movie.content_ratings) : getCertification(movie.release_dates))
    : null;

  useEffect(() => {
    if (!mediaId) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      setErrorMessage("");
      setShowTrailer(false);
      try {
        const movieData = await getMediaById(mediaType, mediaId);
        setMovie(movieData);
      } catch (error) {
        console.log(`-[MovieDetails]-Error fetching ${mediaType} details: ${error}`);
        setErrorMessage("Failed to load details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [mediaType, mediaId])

  if (isLoading) {
    return (
      <section className="mt-10 absolute inset-0 flex-c-c">
        <div className="mt-6">
          <Spinner />
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="mt-10 space-y-6">
        <p className="text-red-500">{errorMessage}</p>
      </section>
    );
  }

  if (!movie) return null;

  const displayTitle = movie.title ?? movie.name;
  const releaseYear = movie.release_date ?? movie.first_air_date;
  const genres = movie.genres || [];
  const actors = movie.credits?.cast?.slice(0, 9) || [];
  const languages =
    movie.spoken_languages?.map((l) => l.english_name).join(" · ") ||
    movie.original_language?.toUpperCase() || "N/A";
  const countries = movie.production_countries?.map((c) => c.name).join(" · ")
    || movie.origin_country?.join(" · ") || "N/A";
  const companies = movie.production_companies?.map((c) => c.name).join(" · ") || "N/A";
  const similarMovies = movie.similar?.results?.slice(0, 10) || [];
  const directors = movie.credits?.crew?.filter((c) => c.job === "Director").map((d) => d.name) || [];

  return (
    <section className="space-y-6">
      <title>{displayTitle || 'Trailer Finder'}</title>
      <MovieInfo
        mediaType={mediaType}
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
        directors={directors}
      />
    </section>
  );
}
export default MovieDetails;