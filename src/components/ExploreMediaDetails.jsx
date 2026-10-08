import {Link} from "react-router-dom";
import ExploreFilters from "./ExploreFilters.jsx";
import MediaCard from "./MediaCard.jsx";
import MovieCardSkeleton from "../utils/MovieCardSkeleton.jsx";

const ExploreMediaDetails = ({
    title, showFilters, errorMessage, isLoading, items, hasMore, sentinelRef, type,
    genreId, genres, yearOptions, year, setGenreId, setYear
  }) => {
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
export default ExploreMediaDetails