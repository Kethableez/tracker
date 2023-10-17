import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of, withLatestFrom } from 'rxjs';
import { ADD_NOTIFICATION } from '../notification/notification.actions';
import { Store } from '@ngrx/store';
import { RootState } from '../root.state';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CREATE, CREATE_SUCCESS, ERROR, GET_ALL, GET_ALL_IF_NEEDED, GET_ALL_SUCCESS } from './account.actions';
import { isAccountInProgress, isReloadNeeded } from './account.selectors';

@Injectable()
export class AccountEffects {
	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CREATE),
			exhaustMap(({ payload }) =>
				this.accountService.createAccount(payload).pipe(
					map((response) => CREATE_SUCCESS({ payload: response })),
					catchError(({ error }) =>
						of(
							ERROR({
								payload: {
									...error,
									showNotification: error.statusCode !== 401
								}
							})
						)
					)
				)
			)
		)
	);

	createSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CREATE_SUCCESS),
			withLatestFrom(this.store$.select(isAccountInProgress)),
			filter(([, inProgress]) => !inProgress),
			map(([{ payload }]) => ADD_NOTIFICATION({ payload: { ...payload, type: 'success' } }))
		)
	);

	getAll$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GET_ALL),
			exhaustMap(() =>
				this.accountService.getAll().pipe(
					map((response) => GET_ALL_SUCCESS({ payload: response })),
					catchError(({ error }) => of(ERROR({ payload: { ...error, showNotification: error.statusCode !== 401 } })))
				)
			)
		)
	);

	getAllIfNeeded = createEffect(() =>
		this.actions$.pipe(
			ofType(GET_ALL_IF_NEEDED),
			withLatestFrom(this.store$.select(isReloadNeeded)),
			filter(([, reloadNeeded]) => reloadNeeded),
			map(() => GET_ALL({ payload: {} }))
		)
	);

	error$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ERROR),
			withLatestFrom(this.store$.select(isAccountInProgress)),
			filter(([{ payload }, inProgress]) => payload.showNotification && !inProgress),
			map(([{ payload }]) => ADD_NOTIFICATION({ payload: { ...payload, type: 'error' } }))
		)
	);
	constructor(
		private store$: Store<RootState>,
		private accountService: AccountService,
		private actions$: Actions,
		private router: Router
	) {}
}
