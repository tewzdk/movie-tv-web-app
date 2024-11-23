import { createAction, props } from '@ngrx/store';
import { Results } from '../../shared/models/results';

// Load Movies
export const loadMovies = createAction('[Movies] Load Movies');

// Load Movies Success
export const loadMoviesSuccess = createAction(
  '[Movies] Load Movies Success',
  props<{ movies: Results }>()
);

// Load Movies Failure
export const loadMoviesFailure = createAction(
  '[Movies] Load Movies Failure',
  props<{ error: string }>()
);

export const loadMoreMovies = createAction(
  '[Movies] Load More Movies',
  props<{ value: string, loadMore: boolean }>()
);

export const loadMoreMoviesSuccess = createAction(
  '[Movies] Load More Movies Success',
  props<{ movies: Results }>()
);

export const searchMovies = createAction(
  '[Movies] Search Movies',
  props<{ value: string }>()
);

// increment page
export const incrementPage = createAction('[Movies] Increment Page');
