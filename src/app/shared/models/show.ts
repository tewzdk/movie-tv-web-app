import { Media } from './media';

export interface Show extends Media {
  name: string;
  original_name: string;
  first_air_date: string;
}
