import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as ShowsActions from '../../store/shows/shows.actions';
import { Show } from '../../shared/models/show';
import { ShowsState } from '../../store/shows/shows.state';
import { MediaPageComponent } from '../../shared/components/media-page/media-page.component';
import { SearchService } from '../../services/search.service';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CommonModule, MediaPageComponent],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.scss',
})
export class ShowsComponent {
  shows$: Observable<Show[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<{ shows: ShowsState }>,
    private router: Router,
    private searchService: SearchService,
    private showService: ShowsService
  ) {
    this.shows$ = this.store.select((state) => state.shows.shows);
    this.loading$ = this.store.select((state) => state.shows.loading);
    this.error$ = this.store.select((state) => state.shows.error);
  }

  searchValueChanged(value: string) {
    if (value) {
      this.store.dispatch(ShowsActions.searchShows({ value })); // Dispatch search action
    } else {
      this.store.dispatch(ShowsActions.loadShows());
    }
  }

  loadMoreItems(): void {
    const value = this.searchService.searchValue();
    const loadMore =
      this.showService.getCurrentPage() < this.showService.getTotalPages();
    this.store.dispatch(ShowsActions.loadMoreShows({ value, loadMore }));
  }

  navigateMovies() {
    this.router.navigate(['']);
  }
}
