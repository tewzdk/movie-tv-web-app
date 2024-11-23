import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ShowsActions from './shows.actions';
import { ShowsService } from '../../services/shows.service';

@Injectable()
export class ShowsEffects {
  constructor(private showsService: ShowsService) {}
  actions$ = inject(Actions);

  readonly loadShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowsActions.loadShows),
      mergeMap(() =>
        this.showsService.getPopularShows(false).pipe(
          map((shows) => ShowsActions.loadShowsSuccess({ shows })),
          catchError((error) =>
            of(ShowsActions.loadShowsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  readonly searchShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowsActions.searchShows), // Listen for the search action
      mergeMap((action) =>
        this.showsService.searchShows(action.value, false).pipe(
          // Use the query string
          map((shows) => ShowsActions.loadShowsSuccess({ shows })), // Dispatch success action
          catchError(
            (error) =>
              of(ShowsActions.loadShowsFailure({ error: error.message })) // Dispatch failure action
          )
        )
      )
    )
  );

  readonly loadMoreShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowsActions.loadMoreShows), // Listen for the search action
      mergeMap((action) => {
        if (!action.loadMore) {
          return of();
        } else if (action.value) {
          return this.showsService.searchShows(action.value, true).pipe(
            map((shows) => ShowsActions.loadMoreShowsSuccess({ shows })), // Dispatch success action
            catchError(
              (error) =>
                of(ShowsActions.loadShowsFailure({ error: error.message })) // Dispatch failure action
            )
          );
        }
        return this.showsService.getPopularShows(true).pipe(
          map((shows) => ShowsActions.loadMoreShowsSuccess({ shows })),
          catchError((error) =>
            of(ShowsActions.loadShowsFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
