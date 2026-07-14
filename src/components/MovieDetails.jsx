import { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
import MovieRow from "./MovieRow.jsx";
import { Link, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const formatMoney = (n) => (n ? `$${(n / 1_000_000).toFixed(1)} million` : "N/A");
const formatRuntime = (m) => (m ? `${Math.floor(m / 60)}h ${m % 60}m` : "N/A");

async function getMovieById(movieId) {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}?append_to_response=credits,videos,release_dates,similar`,
    API_OPTIONS
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch movie details");
  }

  return data;
}

function getTrailer(videos) {
  if (!videos?.results?.length) return null;

  const trailer = videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
  );

  const fallback = videos.results.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  return trailer || fallback || null;
}

function getCertification(releaseDates) {
  if (!releaseDates?.results?.length) return null;
  const us = releaseDates.results.find((r) => r.iso_3166_1 === "US");
  const withCert = us?.release_dates?.find((rd) => rd.certification);
  return withCert?.certification || null;
}

// Строка "Label / value", как в макете: фиксированная колонка лейбла + значение
const InfoRow = ({ label, children }) => (
  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
    <span className="shrink-0 text-sm text-gray-100 sm:w-36">{label}</span>
    <span className="text-sm text-light-100">{children}</span>
  </div>
);

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
      <div className="mx-auto max-w-7xl rounded-[32px] border border-light-100/10 bg-dark-100 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] fade-in-up sm:p-10">
        {/* Title + rating */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {movie.title}
            </h2>
            <p className="mt-1 text-sm text-gray-100">
              {releaseYear ? releaseYear.split("-")[0] : "N/A"}
              {certification && <> · {certification}</>}
              {movie.runtime ? <> · {formatRuntime(movie.runtime)}</> : null}
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 shadow-inner shadow-light-100/10">
            <span className="text-amber-400">★</span>
            <span className="text-sm font-bold text-white">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
            </span>
            <span className="text-xs text-gray-100">
              ({movie.vote_count ? `${Math.round(movie.vote_count / 1000)}K` : "N/A"})
            </span>
          </div>
        </div>

        {/* Poster + Backdrop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <img
            className="h-full w-full rounded-xl object-cover"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "/images/no-movie.png"
            }
            alt={movie.title}
          />

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
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-primary/70 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-primary/90"
              >
                ▶ Trailer
              </button>
            )}

            {showTrailer && (
              <button
                onClick={() => setShowTrailer(false)}
                aria-label="Close trailer"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/70 text-white transition-colors hover:bg-primary/90"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Genres + Homepage */}
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

        {/* Details list */}
        <div className="mt-6 max-w-3xl space-y-3">
          {movie.overview && (
            <InfoRow label="Overview">{movie.overview}</InfoRow>
          )}
          <InfoRow label="Release date">{releaseYear || "N/A"}</InfoRow>
          <InfoRow label="Countries">{countries}</InfoRow>
          <InfoRow label="Status">{movie.status || "N/A"}</InfoRow>
          <InfoRow label="Language">{languages}</InfoRow>
          <InfoRow label="Budget">{formatMoney(movie.budget)}</InfoRow>
          <InfoRow label="Revenue">{formatMoney(movie.revenue)}</InfoRow>
          {movie.tagline && <InfoRow label="Tagline">{movie.tagline}</InfoRow>}
          <InfoRow label="Production Companies">{companies}</InfoRow>
        </div>

        {/* Actors */}
        {actors.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm text-gray-100">Actors</p>
            <ul className="flex flex-row gap-3 overflow-x-auto text-[0.8rem] hide-scrollbar">
              {actors.map((actor) => (
                <li key={actor.id} className="w-[110px] shrink-0">
                  <img
                    className="aspect-[2/3] w-full rounded-lg object-cover"
                    src={
                      actor?.profile_path
                        ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                        : "/images/no-actor.png"
                    }
                    alt={actor.name}
                  />
                  <p className="truncate text-light-200">{actor.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <MovieRow title="Similar movies" movies={similarMovies} />
        <Link
          to="/"
          className="rounded-lg
          max-w-100
          bg-blue-950
          px-4 py-2 text-white mt-10
          flex flex-row items-center justify-center"
        >
          ← Back to Movies
        </Link>
      </div>
    </section>
  );
}

export default MovieDetails;
