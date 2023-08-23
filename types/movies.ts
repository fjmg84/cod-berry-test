export interface Filter{
  page: number;
  time_window: "day" | "week" | string
}

export interface AllMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null; // The "?" makes the property optional
  release_date?: Date | null; // The "?" makes the property optional
  title?: string | null; // The "?" makes the property optional
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Data {
  page: number;
  results: AllMovies[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any; // Puedes especificar el tipo exacto si conoces la estructura de este campo
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id?: string | null; // El "?" hace que el campo sea opcional
  original_language: string;
  original_title: string;
  overview?: string | null; // El "?" hace que el campo sea opcional
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}
interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
interface ProductionCountry {
  iso_3166_1: String;
  name: String;
}
interface SpokenLanguage {
  english_name: String;
  iso_639_1: String;
  name: String;
}
