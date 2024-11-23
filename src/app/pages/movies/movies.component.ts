import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../../store/movies/movies.actions';
import { Router } from '@angular/router';
import { Movie } from '../../shared/models/movie';
import { MoviesState } from '../../store/movies/movies.state';
import { MediaPageComponent } from '../../shared/components/media-page/media-page.component';
import { SearchService } from '../../services/search.service';
import { MoviesService } from '../../services/movies.service';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MediaPageComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<{ movies: MoviesState }>,
    private router: Router,
    private searchService: SearchService,
    private movieService: MoviesService
  ) {
    this.movies$ = this.store.select((state) => state.movies.movies);
    this.loading$ = this.store.select((state) => state.movies.loading);
    this.error$ = this.store.select((state) => state.movies.error);
  }

  searchValueChanged(value: string) {
    if (value) {
      this.store.dispatch(MoviesActions.searchMovies({ value })); // Dispatch search action
    } else {
      this.store.dispatch(MoviesActions.loadMovies());
    }
  }

  loadMoreItems(): void {
    const value = this.searchService.searchValue();
    const loadMore =
      this.movieService.getCurrentPage() < this.movieService.getTotalPages();

    this.store.dispatch(
      MoviesActions.loadMoreMovies({ value, loadMore: loadMore })
    );
  }

  navigateShows() {
    this.router.navigate(['/shows']);
  }
}
