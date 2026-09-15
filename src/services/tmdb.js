export const formatMoney = (n) => (n ? `$${(n / 1_000_000).toFixed(1)} million` : "N/A");
export const formatRuntime = (m) => (m ? `${Math.floor(m / 60)}h ${m % 60}m` : "N/A");

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// mediaType: 'movie' | 'tv'
export async function getMediaById(mediaType, id) {
  const appendMap = {
    movie: "credits,videos,release_dates,similar",
    tv: "credits,videos,content_ratings,similar",
  };
  const response = await fetch(
    `${API_BASE_URL}/${mediaType}/${id}?include_adult=false&append_to_response=${appendMap[mediaType]}`,
    API_OPTIONS
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message || `-[TMDB]-Failed to fetch ${mediaType} details`);
  return data;
}

export async function getTrendingAll(page = 1) {
  const response = await fetch(
    `${API_BASE_URL}/trending/all/day?page=${page}`, API_OPTIONS);
  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message || "-[TMDB]-Failed to fetch trending");
  return data;
}

export async function searchMulti(query, page = 1) {
  const response = await fetch(
    `${API_BASE_URL}/search/multi?include_adult=false&query=${encodeURIComponent(query)}&page=${page}`,
    API_OPTIONS
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message || "-[TMDB]-Failed to search");
  return data;
}

export async function discoverMedia(mediaType,
  { page = 1, genreId = "", year = "" } = {}) {
  const params = new URLSearchParams({
    include_adult: "false",
    page: String(page),
    sort_by: "popularity.desc",
  });
  if (genreId) params.set("with_genres", genreId);
  if (year) params.set(mediaType === "tv" ? "first_air_date_year" : "primary_release_year", year);

  const response = await fetch(`${API_BASE_URL}/discover/${mediaType}?${params.toString()}`, API_OPTIONS);
  const data = await response.json();

  if (!response.ok) throw new Error(data.status_message || `-[TMDB]-Failed to discover ${mediaType}`);
  return data;
}

export async function getTopRatedMovies(page = 1) {
  const response = await fetch(`${API_BASE_URL}/movie/top_rated?page=${page}`, API_OPTIONS);
  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message || "-[TMDB]-Failed to fetch top rated movies");
  return data;
}

// mediaType: 'movie' | 'tv'
export async function getGenres(mediaType) {
  const response = await fetch(
    `${API_BASE_URL}/genre/${mediaType}/list`,
    API_OPTIONS
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message || `-[TMDB]-Failed to fetch ${mediaType} genres`);
  return data.genres || [];
}

export function getTrailer(videos) {
  if (!videos?.results?.length) return null;
  const trailer = videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official);
  const fallback = videos.results.find((v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
  return trailer || fallback || null;
}

// Movie certification (release_dates shape)
export function getCertification(releaseDates) {
  if (!releaseDates?.results?.length) return null;
  const us = releaseDates.results.find((r) => r.iso_3166_1 === "US");
  const withCert = us?.release_dates?.find((rd) => rd.certification);
  return withCert?.certification || null;
}

// TV certification (content_ratings shape — different key, no nested array)
export function getTVCertification(contentRatings) {
  if (!contentRatings?.results?.length) return null;
  const us = contentRatings.results.find((r) => r.iso_3166_1 === "US");
  return us?.rating || null;
}