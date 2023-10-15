import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../tracker/core/store/app.states';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { authError, login, loginSuccess, refresh, refreshSuccess, register, registerSuccess } from './auth.actions';
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { NotificationService } from '../../shared/notification/notification.service';
import { AuthInProgress } from './auth.selectors';

@Injectable()
export class AuthEffects {
	constructor(
		private store$: Store<RootState>,
		private actions$: Actions,
		private authService: AuthService,
		private router: Router,
		private notificationService: NotificationService
	) {}

	register$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(register),
				exhaustMap((action) =>
					this.authService.register(action.payload).pipe(
						map((response) => registerSuccess(response)),
						catchError(({ error }) => of(authError({ error })))
					)
				)
			),
		{ functional: true }
	);

	refresh$ = createEffect(() =>
		this.actions$.pipe(
			ofType(refresh),
			exhaustMap(() =>
				this.authService.refreshToken().pipe(
					map((response) => refreshSuccess({ payload: response })),
					catchError(({ error }) => of(authError({ error })))
				)
			)
		)
	);

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(login),
			exhaustMap((action) =>
				this.authService.login(action.payload).pipe(
					map((response) => loginSuccess({ payload: response })),
					catchError(({ error }) => of(authError({ error })))
				)
			)
		)
	);

	registerSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(registerSuccess),
				withLatestFrom(this.store$.select(AuthInProgress)),
				tap(([payload]) => this.notificationService.addSuccessNotification(payload.header, payload.message))
			),
		{ dispatch: false }
	);
}
