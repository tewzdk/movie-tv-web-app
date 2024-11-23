import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { Results } from '../shared/models/results';
import { Store } from '@ngrx/store';
import { MoviesState } from '../store/movies/movies.state';
import {
  selectCurrentMoviesPage,
  selectTotalMoviesPage,
} from '../store/movies/movies.selectors';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(
    private http: HttpClient,
    private store: Store<{ movies: MoviesState }>
  ) {}

  getTopRatedMovies(nextPage: boolean): Observable<Results> {
    const nextPageNumber = this.getNextPage(nextPage);
    return this.http.get<Results>(`${environment.apiUrl}/movie/top_rated`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + environment.api_key,
      },
      params: {
        language: 'en-US',
        page: nextPageNumber,
      },
    });
  }

  searchMovies(value: string, nextPage: boolean): Observable<Results> {
    const nextPageNumber = this.getNextPage(nextPage);
    return this.http.get<Results>(`${environment.apiUrl}/search/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + environment.api_key,
      },
      params: {
        language: 'en-US',
        query: value,
        page: nextPageNumber,
      },
    });
  }

  getCurrentPage(): number {
    let currentPage = 1;
    this.store
      .select(selectCurrentMoviesPage)
      .pipe(first())
      .subscribe((page) => {
        currentPage = page;
      });
    return currentPage;
  }

  getTotalPages(): number {
    let totalPages = 0;
    this.store.select(selectTotalMoviesPage).subscribe((total) => {
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
