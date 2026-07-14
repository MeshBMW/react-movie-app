import { useEffect, useState,} from "react";
import Spinner from "./Spinner.jsx";
import {Link} from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

async function getMovieById(movieId) {
  const response = await fetch(`${API_BASE_URL}/movie/${movieId}?append_to_response=credits,videos`, API_OPTIONS);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch movie details");
  }

  return data;
}
function getTrailer(videos) {
  if (!videos?.results?.length) return null;

  // сначала ищем официальный трейлер
  const trailer = videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
  );

  // если официального нет — берём любой трейлер или тизер
  const fallback = videos.results.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  return trailer || fallback || null;
}

function MovieDetails({ movieId, onBack }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const trailer = movie ? getTrailer(movie.videos) : null;
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
          <button
            className="mb-6 cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white"
            onClick={onBack}
          >
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
          <button className="mb-6 cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white"
            onClick={onBack}
          >
            Back to movies
          </button>
        )}
        <p className="text-red-500">{errorMessage}</p>
      </section>
    );
  }

  if (!movie) return null;

  const releaseYear = movie.release_date
  const genres = movie.genres?.map((genre) => genre.name).join(" | ") || "N/A";
  const actors = movie.credits?.cast?.slice(0, 9) || []

  return (
    <section className="mt-10 space-y-6">
      {onBack && (
        <button className="cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white" onClick={onBack}>
          Back to movies
        </button>
      )}
      <div className="grid gap-8 rounded-2xl bg-dark-100 p-5 shadow-inner shadow-light-100/10 md:grid-cols-2">
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Poster + Title */}
          <div className="flex flex-col gap-3 sm:w-1/3">
            <h2 className="text-white text-xl font-bold text-center sm:text-left">
              {movie.title}({releaseYear.split('-')[0]})
            </h2>
            <img
              className="w-full max-w-[400px] rounded-lg object-cover mx-auto sm:mx-0"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : '/images/no-movie.png'
              }
              alt={movie.title}
            />
          </div>

          {/* Info */}
          <div className="grid gap-1.5 text-sm sm:grid-cols-1 sm:w-2/3">
            {/* invisible spacer, same classes as the real h2, to push this column down */}
            <h2 className="text-xl font-bold invisible hidden sm:block">
              {movie.title}
            </h2>

            <p className='text-white '>Release Date: <span className='text-light-200'>{releaseYear}</span></p>
            <p className='text-white '>
              Rating:
              <span className='text-light-200'> ⭐{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / {movie.vote_count ?? "N/A"}</span>
            </p>
            <p className='text-white'>
              Duration: <span className='text-light-200'> {movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
            </p>
            <p className='text-white'>
              Language: <span className='text-light-200'>{movie.original_language?.toUpperCase() || "N/A"}</span>
            </p>
            <p className='text-white'>
              Genres: <span className='text-light-200'>{genres}</span>
            </p>
            <div className='text-white'>
              Actors: {''}
              <div className='text-[0.8rem] grid grid-cols-2 gap-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
                {actors.map((actor) => (
                  <div key={actor.id}>
                    <img
                      className='aspect-[2/3] w-full rounded-lg object-cover'
                      src={
                        actor?.profile_path
                          ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                          : '/images/no-actor.png'
                      }
                      alt=""
                    />
                    <p>{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to='/'
              className='p-2 rounded-[5px] bg-blue-950 max-w-[136px] shadow-2xs text-white'
            >← Back to Movies
            </Link>
          </div>
        </div>
      </div>
      <div>
        {/* остальной контент */}
        {trailer
          ? (
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) :
          <p className='text-white'>No trailer available</p>
        }
      </div>
    </section>
  );
}
export default MovieDetails;