import { Search } from "./Search.jsx";
import AllMovies from "./AllMovies.jsx";
import TrendingMovies from "./TrendingMovies.jsx";

function Wrapper({ searchTerm, setSearchTerm, isLoading, errorMessage, movieList, trendingMovies, fetchMovies, results }) {
  return (
    <div className="wrapper">
      <header>
        <img src="/images/hero.png" alt="Hero Banner"/>
        <h1> Find <span className="text-gradient">Movies</span> You'll  Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      <TrendingMovies trendingMovies={trendingMovies}/>

      <AllMovies
        isLoading={isLoading}
        errorMessage={errorMessage}
        movieList={movieList}
        fetchMovies={fetchMovies}
        results={results}
      />
    </div>
  )
}
export default Wrapper