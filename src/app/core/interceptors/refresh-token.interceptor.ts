import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { BehaviorSubject, catchError, first, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../tracker/core/store/app.states';
import { refresh, refreshSuccess } from '../../auth/store/auth.actions';
import * as Auth from '../../auth/store/auth.reducers';
import { selectAuth } from '../../auth/store';

import { OperatorFunction, filter } from 'rxjs';

export const exists = <T>(state: T): boolean => !!state;

export function filterExists<T>(): OperatorFunction<T, NonNullable<T>> {
	return filter<T>((item) => exists(item)) as OperatorFunction<T, NonNullable<T>>;
}

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	private inProgress = false;
	private refreshTokenSubject: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);
	constructor(private authService: AuthService, private store$: Store<RootState>) {}

	// 1. Send request
	// 2. If 401
	//    2.1 Dispatch refresh action
	//    2.2 If Valid -> save token and return to req
	//    2.3 If Not   -> throw unauthorized + clear data + redirect
	// 3. Else return req

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error) =>
				this.store$.select(selectAuth).pipe(
					first(),
					switchMap((authState) => this.handleError(req, next, error, authState))
				)
			)
		);
	}

	private handleError(req: HttpRequest<unknown>, next: HttpHandler, error: HttpErrorResponse, authState: Auth.State) {
		const url = req.url;
		const statusCode = error.status;
		const isRefreshToken = url.split('/').includes('refresh');

		if (statusCode !== 401) {
			if (isRefreshToken) {
			}
			throw error;
		}

		return this.refreshToken(req, next, authState);
	}

	private refreshToken(req: HttpRequest<unknown>, next: HttpHandler, authState: Auth.State) {
		console.log('refresh');
		if (this.inProgress) {
			return this.refreshTokenSubject.pipe(
				filterExists(),
				first(),
				switchMap(() => next.handle(req))
			);
		} else {
			this.inProgress = true;
			this.refreshTokenSubject.next(null);
			if (!authState.inProgress) {
				console.log('dispacz');
				this.store$.dispatch(refresh());
			}

			return this.store$.select(selectAuth).pipe(
				filter((newAuth) => !newAuth.inProgress),
				first(),
				tap((newAuth) => {
					this.inProgress = false;
					this.refreshTokenSubject.next(newAuth);
				}),
				switchMap(() => next.handle(req))
			);
		}
	}
}
