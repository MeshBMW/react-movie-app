import { Link } from "react-router-dom";

const TrendingMovies = ({ trendingMovies }) => {
  return (
    <>
      {trendingMovies.length > 0 ? (
        <section className="trending">
          <h2>Trends</h2>
          <ul>
            {trendingMovies.map((movie, i) => (
              <li key={movie.$id}>
                <p>{i+1}</p>
                <Link to={`/movies/${movie.movie_id}`}>
                  <img src={movie.poster_url} alt={movie.title}/>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
          <p className='text-white text-sm'>No trending movies found.</p>
      )}
    </>
  )
}
export default TrendingMovies