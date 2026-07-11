import { useEffect, useState,} from "react";
import Spinner from "./Spinner.jsx";
import {Link} from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

async function getMovieById(movieId) {
  const response = await fetch(`${API_BASE_URL}/movie/${movieId}`, API_OPTIONS);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch movie details");
  }

  return data;
}

function MovieDetails({ movieId, onBack }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      setErrorMessage("");

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

  if (isLoading) {
    return (
      <section className="mt-10">
        {onBack && (
          <button className="mb-6 cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white" onClick={onBack}>
            Back to movies
          </button>
        )}
        <Spinner />
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="mt-10">
        {onBack && (
          <button className="mb-6 cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white" onClick={onBack}>
            Back to movies
          </button>
        )}
        <p className="text-red-500">{errorMessage}</p>
      </section>
    );
  }

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
    : "/images/no-movie.png";
  const releaseYear = movie.release_date
  const genres = movie.genres?.map((genre) => genre.name).join(" | ") || "N/A";

  return (
    <section className="mt-10 space-y-6">
      {onBack && (
        <button className="cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white" onClick={onBack}>
          Back to movies
        </button>
      )}
      <div className="grid gap-8 rounded-2xl bg-dark-100 p-5 shadow-inner shadow-light-100/10 md:grid-cols-2">
        <img className="w-full rounded-lg object-cover" src={posterUrl} alt={movie.title} />
        <div className="space-y-4 text-gray-100">
          <h2>{movie.title}</h2>
          {movie.tagline && <p className="text-light-200">{movie.tagline}</p>}
          <p>{movie.overview || "No overview available."}</p>

          <div className="grid gap-1.5 text-sm sm:grid-cols-1">
            <p className='text-white text-[20px]'>Release Date: <span className='text-light-200'>{releaseYear}</span></p>
            <p className='text-white text-[20px]'>
              Rating:
              <span className='text-light-200'> ⭐{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / {movie.vote_count ?? "N/A"}</span>
            </p>

            <p className='text-white text-[20px]'>
              Duration: <span className='text-light-200'> {movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
            </p>
            <p className='text-white text-[20px]'>
              Language: <span className='text-light-200'>{movie.original_language?.toUpperCase() || "N/A"}</span>
            </p>
            <p className='text-white text-[20px]'>
              Genres: <span className='text-light-200'>{genres}</span>
            </p>
            <Link
              to='/'
              className='p-2 rounded-[5px] bg-blue-950 max-w-33 shadow-2xs text-white'
            >← Back to Movies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MovieDetails;
