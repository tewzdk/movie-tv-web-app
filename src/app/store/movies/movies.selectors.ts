import { createSelector } from '@ngrx/store';
import { MoviesState } from './movies.state';

export const selectMoviesState = (state: { movies: MoviesState }) =>
  state.movies;

export const selectCurrentMoviesPage = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.page
);


export const selectTotalMoviesPage = createSelector(
  selectMoviesState,
  (state: MoviesState) => state.total_pages
);
