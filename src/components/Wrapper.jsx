import { Search } from "./Search.jsx";
import MediaGrid from "./MediaGrid.jsx";
import TrendingMovies from "./TrendingMovies.jsx";

function Wrapper({
  searchTerm, setSearchTerm, isLoading, errorMessage, isSearchMode, isSearching, newMovies,
  searchResultsList, trendingAll, popularMovies, popularTV, trendingSearches, inputRef, horrorMovies
 }) {
  return (
    <div className="wrapper">
      <header>
        <img src="/images/hero.png" alt="Hero Banner"/>
        <h1> Find <span className="text-gradient">Movies & Shows</span> You'll Enjoy Without the Hassle</h1>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          inputRef={inputRef}
          isSearchMode={isSearchMode}
          isSearching={isSearching}
          errorMessage={isSearchMode ? errorMessage : ''}
          searchResultsList={searchResultsList}
        />
      </header>

      <TrendingMovies trendingMovies={trendingSearches} />
      <MediaGrid
        title="Trending Now"
        items={trendingAll}
        exploreType="trending"
        isLoading={isLoading}
        errorMessage={isSearchMode ? '' : errorMessage}
      />
      <MediaGrid
        title="Came out in 2026"
        items={newMovies}
        mediaType="movie"
        exploreType="movie"
        isLoading={isLoading}
        errorMessage={isSearchMode ? '' : errorMessage}
      />
      <MediaGrid
        title="Popular Movies"
        items={popularMovies}
        mediaType="movie"
        exploreType="movie"
        isLoading={isLoading}
        errorMessage={isSearchMode ? '' : errorMessage}
      />
      <MediaGrid
        title="Horror Movies You Might Like"
        items={horrorMovies}
        mediaType="movie"
        exploreType="movie"
        isLoading={isLoading}
        errorMessage={isSearchMode ? '' : errorMessage}
      />
      <MediaGrid
        title="Popular TV Shows"
        items={popularTV}
        mediaType="tv"
        exploreType="tv"
        isLoading={isLoading}
        errorMessage={isSearchMode ? '' : errorMessage}
      />
    </div>
  )
}
export default Wrapper