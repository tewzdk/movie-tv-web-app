import { Show } from '../../shared/models/show';

export interface ShowsState {
  shows: Show[]; // List of shows
  page: number; // Current page
  total_pages: number; // Total number of pages
  loading: boolean; // Loading state
  error: string | null; // Error message
}

export const initialState: ShowsState = {
  shows: [],
  page: 1,
  total_pages: 0,
  loading: false,
  error: null,
};
