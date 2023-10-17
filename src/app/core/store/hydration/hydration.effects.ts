import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, exhaustMap, map, tap } from 'rxjs';
import { RootState } from '../root.state';
import { hydrate, hydrateFailure, hydrateSuccess } from './hydration.actions';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(hydrate),
      map(() => {
        const storageValue = window.localStorage.getItem('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return hydrateSuccess({ state });
          } catch {
            window.localStorage.removeItem('state');
          }
        }
        return hydrateFailure();
      })
    )
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(hydrateSuccess, hydrateFailure),
        exhaustMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => window.localStorage.setItem('state', JSON.stringify(state)))
      ),
    { dispatch: false }
  );

  constructor(private action$: Actions, private store: Store<RootState>) {}

  ngrxOnInitEffects(): Action {
    return hydrate();
  }
}
