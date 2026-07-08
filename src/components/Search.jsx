export function Search({searchTerm, setSearchTerm}) {

  return (
      <div className="search">
        <div>
        <img src="search.svg" alt="*"/>

          <input
            className="text-white  outline-none"
            type="text"
            placeholder="Search through 1000's of movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
  )
}