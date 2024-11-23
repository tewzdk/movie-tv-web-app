import { Component, input, OnInit } from '@angular/core';
import { Media } from '../../models/media';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'media-item',
  standalone: true,
  imports: [CommonModule, RatingComponent],

  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.scss',
})
export class MediaItemComponent implements OnInit {
  media = input.required<Media>();

  defaultImageUrl: string = 'assets/default-image.jpg'; 
  backdropPath = '';
  imageUrl = '';
  ngOnInit(): void {
    this.backdropPath = this.media().backdrop_path;
    this.imageUrl = `https://image.tmdb.org/t/p/w300${this.backdropPath}`;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImageUrl;
  }
}
