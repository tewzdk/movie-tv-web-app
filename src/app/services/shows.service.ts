import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { Results } from '../shared/models/results';
import { Store } from '@ngrx/store';
import { ShowsState } from '../store/shows/shows.state';
import {
  selectCurrentShowsPage,
  selectTotalShowsPage,
} from '../store/shows/shows.selectors';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  constructor(
    private http: HttpClient,
    private store: Store<{ shows: ShowsState }>
  ) {}

  getPopularShows(nextPage: boolean): Observable<Results> {
    const nextPageNumber = this.getNextPage(nextPage);
    return this.http.get<Results>(`${environment.apiUrl}/tv/top_rated`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + environment.api_key,
      },
      params: {
        page: nextPageNumber,
      },
    });
  }

  searchShows(value: string, nextPage: boolean): Observable<Results> {
    const nextPageNumber = this.getNextPage(nextPage);
    return this.http.get<Results>(`${environment.apiUrl}/search/tv`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + environment.api_key,
      },
      params: {
        query: value,
        page: nextPageNumber,
      },
    });
  }

  getCurrentPage(): number {
    let currentPage = 1;
    this.store
      .select(selectCurrentShowsPage)
      .pipe(first())
      .subscribe((page) => {
        currentPage = page;
      });
    return currentPage;
  }

  getTotalPages(): number {
    let totalPages = 0;
    this.store.select(selectTotalShowsPage).subscribe((total) => {
      totalPages = total;
    });
    return totalPages;
  }

  private getNextPage(nextPage: boolean): number {
    const currentPage = this.getCurrentPage();
    const totalPages = this.getTotalPages();
    let nextPageNumber = currentPage;
    if (nextPage && currentPage < totalPages) {
      nextPageNumber++;
    } else if (!nextPage && currentPage > 1) {
      nextPageNumber = 1;
    }
    return nextPageNumber;
  }
}
