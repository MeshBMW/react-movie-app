import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { discoverMedia, getGenres, getTrendingAll, TITLES } from "../services/tmdb.js";
import ExploreMediaDetails from "../components/ExploreMediaDetails.jsx";

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
          : await discoverMedia(type, { page: 1, genreId, year,});
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
          : await discoverMedia(type, { page, genreId, year });
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
    <ExploreMediaDetails
        year={year}
        yearOptions={yearOptions}
        title={title}
        hasMore={hasMore}
        genres={genres}
        genreId={genreId}
        setGenreId={setGenreId}
        setYear={setYear}
        showFilters={showFilters}
        errorMessage={errorMessage}
        isLoading={isLoading}
        items={items}
        sentinelRef={sentinelRef}
        type={type}
    />
  );
}

function ExplorePage() {
  const { type } = useParams(); // 'trending' | 'movie' | 'tv'
  // key={type} forces a full remount (fresh state, fresh filters) when switching category
  return <ExploreView key={type} type={type} />;
}
export default ExplorePage;