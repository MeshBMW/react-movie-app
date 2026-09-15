import { Link } from "react-router-dom";
import { useEffect } from "react";

export function Search({ searchTerm, setSearchTerm, isSearchMode, isSearching, errorMessage, searchResultsList }) {
  const closeSearch = () => setSearchTerm('');
  useEffect(() => {
    if (!isSearchMode) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSearchMode]);

  return (
    <>
      {isSearchMode && <div className="search-overlay" onClick={closeSearch} />}

      <div className="search">
        <div>
          <img className="search-icon" src="/search.svg" alt="*" />
          <input
            className="text-white outline-none"
            type="text"
            placeholder="Search through millions of movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isSearchMode && (
          <div className="search-dropdown">
            {isSearching ? (
              <p className="search-dropdown-msg">Searching…</p>
            ) : errorMessage ? (
              <p className="search-dropdown-msg">{errorMessage}</p>
            ) : (
              <ul>
                {searchResultsList.map((item) => {
                  const type = item.media_type ?? 'movie';
                  const displayTitle = item.title ?? item.name;
                  const dateStr = item.release_date ?? item.first_air_date;
                  return (
                    <li key={item.id}>
                      <Link to={`/${type}/${item.id}`} onClick={closeSearch}>
                        <img
                          src={item.poster_path
                            ? `https://image.tmdb.org/t/p/w92/${item.poster_path}`
                            : "/images/no-movie.png"
                          }
                          alt={displayTitle}
                        />
                        <div className='flex flex-col ml-1'>
                          <p className="search-item-title">{displayTitle}</p>
                          <p className="search-item-meta">
                            {type === 'tv' ? 'TV Show' : 'Movie'} {dateStr ? `· ${dateStr.split("-")[0]}` : ''}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  )
}