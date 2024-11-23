import { Movie } from "../../shared/models/movie";

export interface MoviesState {
  movies: Movie[]; // List of movies
  page: number; // Current page
  total_pages: number; // Total number of pages
  loading: boolean; // Loading state
  error: string | null; // Error message
}

export const initialState: MoviesState = {
  movies: [],
  page: 1,
  total_pages: 0,
  loading: false,
  error: null,
};
