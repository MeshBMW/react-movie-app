import { formatMoney } from "../services/tmdb.js";
import { InfoRow } from "../utils/InfoRow.jsx";

const MovieDetailsList = ({ movie, mediaType, countries, releaseYear, languages, companies }) => {
  const isTV = mediaType === 'tv';
  return (
    <div className="mt-2 max-w-3xl space-y-3">
      <InfoRow label="Status">{movie.status || "N/A"}</InfoRow>
      <InfoRow label="Overview">{movie.overview}</InfoRow>
      <InfoRow label={isTV ? "First aired" : "Release date"}>{releaseYear || "N/A"}</InfoRow>
      <InfoRow label="Countries">{countries}</InfoRow>
      <InfoRow label="Language">{languages}</InfoRow>
      {isTV ? (
        <>
          <InfoRow label="Seasons">{movie.number_of_seasons ?? "N/A"}</InfoRow>
          <InfoRow label="Episodes">{movie.number_of_episodes ?? "N/A"}</InfoRow>
          <InfoRow label="Networks">{movie.networks?.map((n) => n.name).join(" · ") || "N/A"}</InfoRow>
        </>
      ) : (
        <>
          <InfoRow label="Budget">{formatMoney(movie.budget)}</InfoRow>
          <InfoRow label="Revenue">{formatMoney(movie.revenue)}</InfoRow>
        </>
      )}
      {movie.tagline && <InfoRow label="Tagline">{movie.tagline}</InfoRow>}
      <InfoRow label="Production Companies">{companies}</InfoRow>
    </div>
  )
}
export default MovieDetailsList