import { useState, useEffect } from 'react'
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "../services/appwrite.js";
import { Analytics } from "@vercel/analytics/react"
import Wrapper from "../components/Wrapper.jsx";
import { API_BASE_URL, API_OPTIONS } from '../services/tmdb.js'

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [results, setResults] = useState('');

  const [movieList, setMovieList] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])

  const fetchMovies = async (query='', isLatest, pageNum = 1) => {
    query = query.trim().toLowerCase();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?include_adult=false&query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?include_adult=false&page=${pageNum}&sort_by=popularity.desc`;

      const latestMovie =
        await fetch(`${API_BASE_URL}/discover/movie?include_adult=false&page=${pageNum}&sort_by=primary_release_date.desc`, API_OPTIONS);

      const response = isLatest ? latestMovie : await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to fetch movies');

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies.')
        setMovieList([])
        return;
      }
      setMovieList(data.results || []);

      if(query && data.results.length > 0) await updateSearchCount(query, data.results[0]);
      if(data.results.length === 0 && query.length > 0) setErrorMessage(`Not found: '${query}'`);
      if(data.results.length > 0 && query.length > 0) setResults(`Search results ${query}`);

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to load movies. Please try again later.');
    }
    finally {
      setIsLoading(false);
    }
  }

  useDebounce(() => {
    setDebouncedSearch(searchTerm);
  }, 600, [searchTerm]);

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies || []);
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
    <>
      <Analytics />
      <main>
        <div className="pattern" />
        <Wrapper
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          errorMessage={errorMessage}
          movieList={movieList}
          trendingMovies={trendingMovies}
          fetchMovies={fetchMovies}
          results={results}
        />
      </main>
    </>
  )
}
export default HomePage