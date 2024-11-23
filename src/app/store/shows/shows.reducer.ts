import { createReducer, on } from '@ngrx/store';
import * as ShowsActions from './shows.actions';
import { initialState } from './shows.state';
import { Show } from '../../shared/models/show';

export const showsReducer = createReducer(
  initialState,
  on(ShowsActions.loadShows, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ShowsActions.loadShowsSuccess, (state, { shows }) => ({
    ...state,
    loading: false,
    shows: shows.results as Show[],
    page: shows.page,
    total_pages: shows.total_pages,
  })),
  on(ShowsActions.incrementPage, (state) => ({
    ...state,
    page: state.page + 1,
  })),
  on(ShowsActions.searchShows, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ShowsActions.loadMoreShows, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ShowsActions.loadMoreShowsSuccess, (state, { shows }) => ({
    ...state,
    loading: false,
    shows: [...state.shows, ...shows.results] as Show[],
    page: shows.page,
    total_pages: shows.total_pages,
  })),
  on(ShowsActions.loadShowsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
