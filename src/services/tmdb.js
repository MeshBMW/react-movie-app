export const formatMoney = (n) => (n ? `$${(n / 1_000_000).toFixed(1)} million` : "N/A");
export const formatRuntime = (m) => (m ? `${Math.floor(m / 60)}h ${m % 60}m` : "N/A");

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function getMovieById(movieId) {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}?append_to_response=credits,videos,release_dates,similar`,
    API_OPTIONS
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch movie details");
  }
  return data;
}
export function getTrailer(videos) {
  if (!videos?.results?.length) return null;

  const trailer = videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
  );

  const fallback = videos.results.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  return trailer || fallback || null;
}
export function getCertification(releaseDates) {
  if (!releaseDates?.results?.length) return null;
  const us = releaseDates.results.find((r) => r.iso_3166_1 === "US");
  const withCert = us?.release_dates?.find((rd) => rd.certification);
  return withCert?.certification || null;
}