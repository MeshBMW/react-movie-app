import { Search } from "./Search.jsx";
import { Link } from "react-router-dom";
import AllMovies from "./AllMovies.jsx";

function Wrapper({ searchTerm, setSearchTerm, isLoading, errorMessage, movieList, trendingMovies, fetchMovies }) {
  return (
    <div className="wrapper">
      <header>
        <img src="/images/hero.png" alt="Hero Banner"/>
        <h1> Find <span className="text-gradient">Movies</span> You'll  Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trends</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <Link to={`/movies/${movie.movie_id}`}>
                  <img src={movie.poster_url} alt={movie.title}/>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AllMovies
        isLoading={isLoading}
        errorMessage={errorMessage}
        movieList={movieList}
        fetchMovies={fetchMovies}
      />
    </div>
  )
}
export default Wrapper