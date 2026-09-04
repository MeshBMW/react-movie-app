export function Search({ searchTerm, setSearchTerm, inputRef }) {
  return (
      <div className="search">
        <div>
        <img src="/search.svg" alt="*"/>

          <input
            className="text-white outline-none"
            type="text"
            placeholder="Search through millions of movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
          />
        </div>
      </div>
  )
}