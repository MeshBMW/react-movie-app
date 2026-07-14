import MovieCard from "./MovieCard.jsx";
import MovieCardSkeleton from "../utils/MovieCardSkeleton.jsx";
import {useState} from "react";

function AllMovies({ isLoading, errorMessage, movieList, fetchMovies}) {
  const [page, setPage] = useState(1);
  const noZero = page === 1 ? 1 : page - 1
  const nextPage = () => {
    fetchMovies('', false, page + 1)
    setPage(page + 1)
  };
  const prevPage = () => {
    fetchMovies('', false, noZero)
    setPage(noZero);
  };

  return (
    <section className="all-movies">
      <div>
        <div className='text-white text-3xl font-bold mb-2'>All Movies <button
          className='text-white p-1 bg-blue-950 rounded-lg cursor-pointer '
          onClick={prevPage}
        >
          <img src='/prev.svg' alt=""/>
        </button>
          <span className='text-light-100 '> {page} </span>
          <button
            className='text-white p-1 bg-blue-950 rounded-lg cursor-pointer'
            onClick={nextPage}
          >
            <img src='/next.svg' alt=""/>
          </button>
        </div>
        <span> • </span>
        <span className='text-white sortBy'>Sort by <span>
            <button
              onClick={() => fetchMovies('', true)}
              className='text-white sortBy-btn'
            >
              Newest
            </button>
          <span className='text-white'> • </span>
          <button
            onClick={() => fetchMovies('', false)}
            className='text-white sortBy-btn'
          >
            Popular
              </button>
            </span>
        </span>

      </div>
      {isLoading ? (
        <ul>
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </ul>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {movieList.map((movie, id) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              style={{ animationDelay: `${Math.min(id * 60, 600)}ms` }}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
export default AllMovies