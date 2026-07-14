const MovieActors = ({actors}) => {
  return (
    <div className="mt-6">
      <p className="mb-2 text-sm text-gray-100">Actors</p>
      <ul className="flex flex-row gap-3 overflow-x-auto text-[0.8rem] hide-scrollbar">
        {actors.map((actor) => (
          <li key={actor.id} className="w-[110px] shrink-0">
            <img
              className="aspect-2/3 w-full rounded-lg object-cover"
              src={
                actor?.profile_path
                  ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                  : "/images/no-actor.png"
              }
              alt={actor.name}
            />
            <p className="truncate text-light-200">{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default MovieActors