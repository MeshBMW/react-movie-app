const ExploreFilters = ({
  genreId, genres, yearOptions, year, setGenreId, setYear
}) => {
  return (
    <div className="explore-filters">
      <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">All years</option>
        {yearOptions.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      {(genreId || year) && (
        <button
          type="button"
          className="clear-filters-btn"
          onClick={() => { setGenreId(""); setYear(""); }}
        >
          Clear
        </button>
      )}
    </div>
  )
}
export default ExploreFilters