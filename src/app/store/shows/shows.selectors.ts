import { createSelector } from '@ngrx/store';
import { ShowsState } from './shows.state';

export const selectShowsState = (state: { shows: ShowsState }) => state.shows;

export const selectCurrentShowsPage = createSelector(
  selectShowsState,
  (state: ShowsState) => state.page
);

export const selectTotalShowsPage = createSelector(
  selectShowsState,
  (state: ShowsState) => state.total_pages
);
