import { useRef } from "react";
import MediaCard from "./MediaCard.jsx";
import MovieCardSkeleton from "../utils/MovieCardSkeleton.jsx";

function MediaGrid({ title, items, mediaType, isLoading, errorMessage }) {
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    scrollRef.current?.scrollBy({ left: e.deltaY * 2, behavior: "auto" });
  };

  return (
    <section className="all-movies">
      <div className='paragraph'>
        <h2>
          {title} <span className="chevron">›</span>
        </h2>
      </div>

      {isLoading ? (
        <ul>
          {Array.from({ length: 10 }).map((_, i) => <MovieCardSkeleton key={i} />)}
        </ul>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul ref={scrollRef} onWheel={handleWheel}>
          {items.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              mediaType={mediaType ?? item.media_type}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
export default MediaGrid