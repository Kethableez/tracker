import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../root.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { catchError, exhaustMap, filter, map, of, withLatestFrom } from 'rxjs';
import { ADD_NOTIFICATION } from '../notification/notification.actions';
import { CREATE, CREATE_SUCCESS, ERROR, GET_ALL, GET_ALL_IF_NEEDED, GET_ALL_SUCCESS } from './category.actions';
import { isCategoryInProgress, isReloadNeeded } from './category.selectors';

@Injectable()
export class CategoryEffects {
	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CREATE),
			exhaustMap(({ payload }) =>
				this.categoryService.createCategory(payload).pipe(
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
			withLatestFrom(this.store$.select(isCategoryInProgress)),
			filter(([, inProgress]) => !inProgress),
			map(([{ payload }]) => ADD_NOTIFICATION({ payload: { ...payload, type: 'success' } }))
		)
	);

	getAll$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GET_ALL),
			exhaustMap(() =>
				this.categoryService.getAll().pipe(
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
			withLatestFrom(this.store$.select(isCategoryInProgress)),
			filter(([{ payload }, inProgress]) => payload.showNotification && !inProgress),
			map(([{ payload }]) => ADD_NOTIFICATION({ payload: { ...payload, type: 'error' } }))
		)
	);
	constructor(
		private store$: Store<RootState>,
		private categoryService: CategoryService,
		private actions$: Actions,
		private router: Router
	) {}
}
