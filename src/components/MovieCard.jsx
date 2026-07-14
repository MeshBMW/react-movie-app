import { useState } from "react";
import { Link } from "react-router-dom";
import useRipple from "../hooks/useRipple";

const MovieCard = ({
  movie : {
    title, poster_path, release_date,  vote_average,  original_language, overview, id,
}}) => {
    const [isFavourite, setIsFavourite] = useState(false)
    const addMovieToFavourite = () => setIsFavourite(!isFavourite);
  const handleClick = useRipple();

  return (
      <>
        <Link to={`/movies/${id}`}>
          <div className="movie-card" onClick={handleClick} >
              <img src={
                poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : '/images/no-movie.png'}
                   alt={title}
              />

            <div className='mt-4'>
              <h3>{title}</h3>
              <div className='content'>
                <div className='rating'>
                  <img src='/star.svg' alt="Star Icon"/>
                  <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                  <span>•</span>
                <p className='lang'>{original_language}</p>
                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                  <button
                    className='like-btn'
                    onClick={addMovieToFavourite}
                  >
                      {isFavourite ? '❤️' : '💜' }
                  </button>
                <p className='overview'>{`${overview}..`}</p>
              </div>
            </div>
          </div>
        </Link>
      </>
  )
}
export default MovieCard
