import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MediaCard from "../components/MediaCard.jsx";
import MovieCardSkeleton from "../utils/MovieCardSkeleton.jsx";
import { discoverMedia, getGenres, getTrendingAll } from "../services/tmdb.js";
import ExploreFilters from "../components/ExploreFilters.jsx";

const TITLES = {
  trending: "Trending Now",
  movie: "Popular Movies",
  tv: "Popular TV Shows",
};

function ExploreView({ type }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [year, setYear] = useState("");

  const sentinelRef = useRef(null);
  const showFilters = type === "movie" || type === "tv";

  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    const years = [];
    for (let y = current + 1; y >= 1950; y--) years.push(y);
    return years;
  }, []);

  // Load the genre list once for this category (movie/tv only)
  useEffect(() => {
    if (!showFilters) return;
    let cancelled = false;
    getGenres(type).then((list) => { if (!cancelled) setGenres(list); }).catch(() => {});
    return () => { cancelled = true; };
  }, [type, showFilters]);

  // Load page 1 whenever the genre or year filter changes
  useEffect(() => {
    let cancelled = false;

    const loadFirstPage = async () => {
      setItems([]);
      setPage(1);
      setTotalPages(1);
      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = type === "trending"
          ? await getTrendingAll(1)
          : await discoverMedia(type, { page: 1, sortBy: "popularity.desc", genreId, year });
        if (cancelled) return;
        const results = (data.results || []).filter((item) => item.media_type !== "person");
        setItems(results);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        if (cancelled) return;
        console.log("-[ExplorePage]-Error loading first page:", error);
        setErrorMessage("Failed to load. Please try again later.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadFirstPage();
    return () => { cancelled = true; };
  }, [type, genreId, year]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "600px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isLoading, page, totalPages]);

  // Fetch whenever `page` advances past 1
  useEffect(() => {
    if (page === 1) return;
    let cancelled = false;

    const loadNextPage = async () => {
      setIsLoading(true);
      try {
        const data = type === "trending"
          ? await getTrendingAll(page)
          : await discoverMedia(type, { page, sortBy: "popularity.desc", genreId, year });
        if (cancelled) return;
        const results = (data.results || []).filter((item) => item.media_type !== "person");
        setItems((prev) => [...prev, ...results]);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        if (cancelled) return;
        console.log("-[ExplorePage]-Error loading next page:", error);
        setErrorMessage("Failed to load more. Please try again later.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadNextPage();
    return () => { cancelled = true; };
  }, [page, type, genreId, year]);

  const title = TITLES[type] || "Explore";
  const hasMore = page < totalPages;

  return (
    <section className="explore-page">
      <div className="explore-header">
        <Link to="/" className="back-link">← Back</Link>
        <h1>{title}</h1>
      </div>

      {showFilters && (
        <ExploreFilters
          genreId={genreId}
          genres={genres}
          yearOptions={yearOptions}
          year={year}
          setGenreId={setGenreId}
          setYear={setYear}
        />
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {!isLoading && items.length === 0 && !errorMessage ? (
        <p className="explore-end">No results match these filters.</p>
      ) : (
        <ul className="explore-grid">
          {items.map((item) => (
            <MediaCard
              key={`${item.id}-${item.media_type ?? type}`}
              media={item}
              mediaType={type === "trending" ? undefined : type}
            />
          ))}
          {isLoading && Array.from({ length: 12 }).map((_, i) => <MovieCardSkeleton key={`skeleton-${i}`} />)}
        </ul>
      )}

      {!hasMore && items.length > 0 && (
        <p className="explore-end">You've reached the end.</p>
      )}

      <div ref={sentinelRef} className="explore-sentinel" />
    </section>
  );
}

function ExplorePage() {
  const { type } = useParams(); // 'trending' | 'movie' | 'tv'
  // key={type} forces a full remount (fresh state, fresh filters) when switching category
  return <ExploreView key={type} type={type} />;
}
export default ExplorePage;