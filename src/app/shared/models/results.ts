import { Media } from './media';

export interface Results {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}
