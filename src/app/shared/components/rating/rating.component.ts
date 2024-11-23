import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class RatingComponent implements OnInit {
  voteAverage = input.required<number>();
  starsArray: number[] = [];
  roundedRating: number = 0;

  ngOnInit() {
    // Round the rating to the nearest whole number
    this.roundedRating = Math.round(this.voteAverage());
    // Create an array for 10 stars
    this.starsArray = Array(10).fill(0);
  }
}
