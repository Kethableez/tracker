import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../root.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import {
	AUTH_ERROR,
	LOGIN,
	LOGIN_SUCCESS,
	LOGOUT,
	LOGOUT_SUCCESS,
	REFRESH,
	REFRESH_SUCCESS,
	REGISTER,
	REGISTER_SUCCESS
} from './auth.actions';
import { catchError, exhaustMap, filter, map, of, tap, withLatestFrom } from 'rxjs';
import { isAuthInProgress } from './auth.selectors';
import { ADD_NOTIFICATION } from '../notification/notification.actions';

@Injectable()
export class AuthEffects {
	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(REGISTER),
			exhaustMap(({ payload }) =>
				this.authService.register(payload).pipe(
					map(({ header, message }) => REGISTER_SUCCESS({ payload: { header, message } })),
					catchError(({ error }) =>
						of(
							AUTH_ERROR({
								payload: {
									header: error.header,
									message: error.message,
									showNotification: error.statusCode !== 401
								}
							})
						)
					)
				)
			)
		)
	);

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LOGIN),
			exhaustMap(({ payload }) =>
				this.authService.login(payload).pipe(
					map((tokenResponse) => LOGIN_SUCCESS({ payload: tokenResponse })),
					catchError(({ error }) =>
						of(
							AUTH_ERROR({
								payload: {
									header: error.header,
									message: error.message,
									showNotification: error.statusCode !== 401
								}
							})
						)
					)
				)
			)
		)
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LOGOUT),
			exhaustMap(() =>
				this.authService.logout().pipe(
					map(() => LOGOUT_SUCCESS()),
					catchError(() => of(LOGOUT_SUCCESS()))
				)
			)
		)
	);

	refresh$ = createEffect(() =>
		this.actions$.pipe(
			ofType(REFRESH),
			exhaustMap(({ payload }) =>
				this.authService.refreshToken().pipe(
					map((tokenResponse) =>
						REFRESH_SUCCESS({
							payload: {
								token: tokenResponse,
								next: payload?.next,
								req: payload?.req
							}
						})
					),
					catchError(() => of(LOGOUT_SUCCESS()))
				)
			)
		)
	);

	refreshSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(REFRESH_SUCCESS),
				filter(({ payload }) => payload.next !== undefined && payload.req !== undefined),
				map(({ payload }) => payload as Required<typeof payload>),
				exhaustMap((payload) => payload.next.handle(payload.req))
			),
		{ dispatch: false }
	);

	registerSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(REGISTER_SUCCESS),
			withLatestFrom(this.store$.select(isAuthInProgress)),
			filter(([, inProgress]) => !inProgress),
			map(([{ payload }]) => ADD_NOTIFICATION({ payload: { ...payload, type: 'success' } }))
		)
	);

	loginSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(LOGIN_SUCCESS),
				tap(() => this.router.navigateByUrl('/tracker'))
			),
		{ dispatch: false }
	);

	logoutSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(LOGOUT_SUCCESS),
				tap(() => this.router.navigateByUrl('/auth'))
			),
		{ dispatch: false }
	);

	error$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AUTH_ERROR),
			withLatestFrom(this.store$.select(isAuthInProgress)),
			filter(([{ payload }, inProgress]) => payload.showNotification && !inProgress),
			map(([{ payload }]) => ADD_NOTIFICATION({ payload: { ...payload, type: 'error' } }))
		)
	);

	constructor(
		private store$: Store<RootState>,
		private actions$: Actions,
		private router: Router,
		private authService: AuthService
	) {}
}
