const MovieActors = ({ actors }) => {
  return (
    <div className="movie-actors">
      <p>Actors</p>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>
            <img
              src={
              actor?.profile_path
                  ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                  : "/images/no-image.jpg"
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default MovieActors