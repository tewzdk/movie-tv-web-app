import { createAction, props } from '@ngrx/store';
import { Results } from '../../shared/models/results';

// Load Shows
export const loadShows = createAction('[Shows] Load Shows');

// Load Shows Success
export const loadShowsSuccess = createAction(
  '[Shows] Load Shows Success',
  props<{ shows: Results }>()
);

// Load Shows Failure
export const loadShowsFailure = createAction(
  '[Shows] Load Shows Failure',
  props<{ error: string }>()
);

export const loadMoreShows = createAction(
  '[Shows] Load Shows Movies',
  props<{ value: string, loadMore: boolean }>()
);

export const loadMoreShowsSuccess = createAction(
  '[Shows] Load More Shows Success',
  props<{ shows: Results }>()
);

export const searchShows = createAction(
  '[Shows] Search Shows',
  props<{ value: string }>()
);

// increment page
export const incrementPage = createAction('[Shows] Increment Page');
