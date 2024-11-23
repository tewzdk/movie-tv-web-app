import { Media } from "./media";

export interface Movie extends Media {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}
