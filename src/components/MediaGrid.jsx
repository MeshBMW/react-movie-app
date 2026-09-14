import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MediaCard from "./MediaCard.jsx";
import MovieCardSkeleton from "../utils/MovieCardSkeleton.jsx";

function MediaGrid({ title, items, mediaType, exploreType, isLoading, errorMessage }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  // Recheck whenever the row's content changes (new items loaded) or the window resizes
  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [items]);

  const scrollByPage = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  const heading = (
    <h2>
      {title} <span className="chevron">›</span>
    </h2>
  );

  return (
    <section className="all-movies">
      <div className='paragraph'>
        {exploreType ? <Link to={`/explore/${exploreType}`}>{heading}</Link> : heading}
      </div>

      {isLoading ? (
        <ul>
          {Array.from({ length: 10 }).map((_, i) => <MovieCardSkeleton key={i} />)}
        </ul>
      ) : errorMessage ? (
        <p className="text-red-500 flex-c-c">{errorMessage}</p>
      ) : (
        <div className="scroll-row">
          {canScrollLeft && (
            <button
              type="button"
              className="scroll-arrow scroll-arrow-left"
              onClick={() => scrollByPage(-1)}
              aria-label="Scroll left"
            >
              ‹
            </button>
          )}

          <ul ref={scrollRef} onScroll={updateScrollButtons}>
            {items.map((item) => (
              <MediaCard
                key={item.id}
                media={item}
                mediaType={mediaType ?? item.media_type}
              />
            ))}
          </ul>

          {canScrollRight && (
            <button
              type="button"
              className="scroll-arrow scroll-arrow-right"
              onClick={() => scrollByPage(1)}
              aria-label="Scroll right"
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  )
}
export default MediaGrid