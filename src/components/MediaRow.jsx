import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function MediaRow({ title, items, mediaType }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [items]);

  if (!items || items.length === 0) return null;

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    scrollRef.current?.scrollBy({ left: e.deltaY * 2, behavior: "auto" });
  };

  const scrollByPage = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>

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

        <ul ref={scrollRef} onWheel={handleWheel} onScroll={updateScrollButtons}>
          {items.map((item) => {
            const type = mediaType ?? item.media_type ?? 'movie';
            const displayTitle = item.title ?? item.name;
            return (
              <li key={item.id}>
                <Link to={`/${type}/${item.id}`} target={"_blank"}>
                  <img
                    className="similar-movies-img"
                    src={item.poster_path
                      ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
                      : "/images/no-movie.png"
                    }
                    alt={displayTitle}
                  />
                  <p className="movie-title">{displayTitle}</p>
                  <p className="movie-review">
                    ⭐ {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                  </p>
                </Link>
              </li>
            );
          })}
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
    </div>
  );
}
export default MediaRow;