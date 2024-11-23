import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import { initialState } from './movies.state';
import { Movie } from '../../shared/models/movie';

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MoviesActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    loading: false,
    movies: movies.results as Movie[],
    page: movies.page,
    total_pages: movies.total_pages,
  })),
  on(MoviesActions.incrementPage, (state) => ({
    ...state,
    page: state.page + 1,
  })),
  on(MoviesActions.searchMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MoviesActions.loadMoreMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MoviesActions.loadMoreMoviesSuccess, (state, { movies }) => ({
    ...state,
    loading: false,
    movies: [...state.movies, ...movies.results] as Movie[],
    page: movies.page,
    total_pages: movies.total_pages,
  })),
  on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
