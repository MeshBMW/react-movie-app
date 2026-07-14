import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";

function AllMovies({ isLoading, errorMessage, movieList, fetchMovies}) {
  return (
    <section className="all-movies">
      <div>
        <div className='text-white text-3xl font-bold'>All Movies</div>
        <span> • </span>
        <span className='text-white sortBy'>Sort by <span>
            <button
              onClick={() => fetchMovies('', true)}
              className='text-white sortBy-btn'
            >Newest
            </button>
          <span className='text-white'> • </span>
          <button
            onClick={() => fetchMovies('', false)}
            className='text-white sortBy-btn'
          >Popular
              </button>
            </span> </span>
      </div>
      {isLoading ? (
        <Spinner />
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