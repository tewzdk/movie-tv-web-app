import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as MoviesActions from './movies.actions';
import { MoviesService } from '../../services/movies.service';

@Injectable()
export class MoviesEffects {
  constructor(private moviesService: MoviesService) {}
  actions$ = inject(Actions);

  readonly loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      mergeMap(() =>
        this.moviesService.getTopRatedMovies(false).pipe(
          map((movies) => MoviesActions.loadMoviesSuccess({ movies })),
          catchError((error) =>
            of(MoviesActions.loadMoviesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  readonly searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.searchMovies), // Listen for the search action
      mergeMap((action) =>
        this.moviesService.searchMovies(action.value, false).pipe(
          // Use the query string
          map((movies) => MoviesActions.loadMoviesSuccess({ movies })), // Dispatch success action
          catchError(
            (error) =>
              of(MoviesActions.loadMoviesFailure({ error: error.message })) // Dispatch failure action
          )
        )
      )
    )
  );

  readonly loadMoreMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMoreMovies), // Listen for the search action
      mergeMap((action) => {
        if (!action.loadMore) {
          return of();
        }
        else if (action.value) {
          return this.moviesService.searchMovies(action.value, action.loadMore).pipe(
            map((movies) => MoviesActions.loadMoreMoviesSuccess({ movies })), // Dispatch success action
            catchError(
              (error) =>
                of(MoviesActions.loadMoviesFailure({ error: error.message })) // Dispatch failure action
            )
          );
        }
        return this.moviesService.getTopRatedMovies(action.loadMore).pipe(
          map((movies) => MoviesActions.loadMoreMoviesSuccess({ movies })),
          catchError((error) =>
            of(MoviesActions.loadMoviesFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
