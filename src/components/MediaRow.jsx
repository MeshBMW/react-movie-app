import { Link } from "react-router-dom";

function MediaRow({ title, items, mediaType }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => {
          const type = mediaType ?? item.media_type ?? 'movie';
          const displayTitle = item.title ?? item.name;
          return (
            <li key={item.id}>
              <Link to={`/${type}/${item.id}`}>
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
    </div>
  );
}
export default MediaRow;