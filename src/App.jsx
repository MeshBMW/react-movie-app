import { useState, useEffect } from 'react'
import { useDebounce } from "react-use";
import { Search } from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { getTrendingMovies, updateSearchCount } from "../appwrite.js";
import './App.css'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => {
    setDebouncedSearch(searchTerm)
  }, 600, [searchTerm]);

  const fetchMovies = async (query='') => {
    query = query.trim().toLowerCase();
    setIsLoading(true);
    setErrorMessage('')

    try {
      const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies.')
        setMovieList([])
        return;
      }
      setMovieList(data.results || [])
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
    finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);
  useEffect(() => {
    loadTrendingMovies();
  }, [])

  return (
  <main>
    <div className="pattern" />

    <div className="wrapper">
      <header>
        <img src="../images/hero.png" alt="Hero Banner"/>

      <h1> Find <span className="text-gradient">Movies</span> You'll  Enjoy Without the Hassle</h1>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title}/>
                  </li>
              ))}
            </ul>
          </section>
      )}

      <section className="all-movies">
        <h2>All Movies</h2>
        {isLoading ? (
            <Spinner />
        ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
        ) : (
            <ul>
              {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
        )}
      </section>
    </div>
  </main>
  )
}

export default App