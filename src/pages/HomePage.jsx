import { useState, useEffect, useRef } from 'react'
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "../services/appwrite.js";
import { Analytics } from "@vercel/analytics/react"
import Wrapper from "../components/Wrapper.jsx";
import { discoverMedia, getTrendingAll, searchMulti } from '../services/tmdb.js'

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const inputRef = useRef();

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [trendingAll, setTrendingAll] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);

  const [searchResultsList, setSearchResultsList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const loadHome = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const [trendingData, moviesData, tvData] = await Promise.all([
        getTrendingAll(),
        discoverMedia('movie', { sortBy: 'popularity.desc' }),
        discoverMedia('tv', { sortBy: 'popularity.desc' }),
      ]);
      setTrendingAll((trendingData.results || []).filter((item) => item.media_type !== 'person'));
      setPopularMovies(moviesData.results || []);
      setPopularTV(tvData.results || []);
    } catch (error) {
      console.log('-[HomePage]-Error loading home sections:', error);
      setErrorMessage('Failed to load. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const runSearch = async (query) => {
    setIsSearching(true);
    setErrorMessage('');
    try {
      const data = await searchMulti(query);
      const results = (data.results || []).filter((item) => item.media_type !== 'person');

      if (results.length === 0) {
        setErrorMessage(`Not found: '${query}'`);
      }
      setSearchResultsList(results);

      if (results.length > 0) await updateSearchCount(query, results[0], results[0].media_type);
    } catch (error) {
      console.log('-[HomePage]-Error searching:', error);
      setErrorMessage('Failed to search. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  }

  useDebounce(() => { setDebouncedSearch(searchTerm) }, 600, [searchTerm]);

  useEffect(() => {
    const loadTrendingSearches = async () => {
      try {
        const movies = await getTrendingMovies();
        setTrendingSearches(movies || []);
      } catch (error) {
        console.log('-[HomePage]-Error fetching trending searches:', error);
      }
    }
    inputRef.current.focus();
    loadTrendingSearches();
    loadHome();
  }, []);

  useEffect(() => {
    const query = debouncedSearch.trim();
    if (!query) {
      setSearchResultsList([]);
      setErrorMessage('');
      return;
    }
    runSearch(query);
  }, [debouncedSearch]);

  const isSearchMode = debouncedSearch.trim().length > 0;

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
          isSearchMode={isSearchMode}
          isSearching={isSearching}
          searchResultsList={searchResultsList}
          trendingAll={trendingAll}
          popularMovies={popularMovies}
          popularTV={popularTV}
          trendingSearches={trendingSearches}
          inputRef={inputRef}
        />
      </main>
    </>
  )
}
export default HomePage