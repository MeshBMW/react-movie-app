import MovieCard from "./MovieCard.jsx";
import MovieCardSkeleton from "../utils/MovieCardSkeleton.jsx";
import { useState } from "react";

function AllMovies({ isLoading, errorMessage, movieList, fetchMovies, searchResults }) {
  const [page, setPage] = useState(1);
  const handleNav = page === 1 ? 1 : page - 1
  const handlePage = async (arg) => {
    if(arg === 'next') {
      await fetchMovies('', false, page + 1);
      setPage(page + 1);
    } else {
      await fetchMovies('', false, handleNav);
      setPage(handleNav);
    }
  }

  return (
    <section className="all-movies">
      <div>
        <div className='paragraph'>
          <h2>All Movies</h2>
          <div>
            <button className='arrow' onClick={() => handlePage('prev')}>
              <img src='/prev.svg' alt=""/>
            </button>
            <span className='text-light-100'> {page} </span>
            <button className='arrow' onClick={() => handlePage('next')}>
              <img src='/next.svg' alt=""/>
            </button>
          </div>
        </div>
        <div>
          <button onClick={() => fetchMovies('', true)} className='sortBy-btn'>
            Not Released
          </button>
          <button onClick={() => fetchMovies('', false)} className='sortBy-btn'>
            Popular
          </button>
        </div>
        <p className='text-white text-[16px] flex-center'>{searchResults}</p>
      </div>
      {isLoading ? (
        <ul>
          {Array.from({ length: 16 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </ul>
      ) : errorMessage ? (
        <p className="text-red-500 flex-c-c">{errorMessage}</p>
      ) : (
        <ul>
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
export default AllMovies