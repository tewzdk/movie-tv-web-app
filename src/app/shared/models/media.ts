export interface Media {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  title?: string; // For movies
  original_title?: string; // For movies
  name?: string; // For shows
  original_name?: string; // For shows
  release_date?: string; // For movies
  first_air_date?: string; // For shows
}
