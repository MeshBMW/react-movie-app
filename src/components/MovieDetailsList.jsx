import { formatMoney } from "../services/tmdb.js";
import { InfoRow } from "../utils/InfoRow.jsx";

const MovieDetailsList = ({ movie, countries, releaseYear, languages, companies }) => {
  return (
    <div className="mt-6 max-w-3xl space-y-3">
      {movie.overview && <InfoRow label="Overview">{movie.overview}</InfoRow>}
      <InfoRow label="Status">{movie.status || "N/A"}</InfoRow>
      <InfoRow label="Release date">{releaseYear || "N/A"}</InfoRow>
      <InfoRow label="Countries">{countries}</InfoRow>
      <InfoRow label="Language">{languages}</InfoRow>
      <InfoRow label="Budget">{formatMoney(movie.budget)}</InfoRow>
      <InfoRow label="Revenue">{formatMoney(movie.revenue)}</InfoRow>
      {movie.tagline && <InfoRow label="Tagline">{movie.tagline}</InfoRow>}
      <InfoRow label="Production Companies">{companies}</InfoRow>
    </div>
  )
}
export default MovieDetailsList