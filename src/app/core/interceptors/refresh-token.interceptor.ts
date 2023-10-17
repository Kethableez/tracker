import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../store/root.state';
import { AuthActions } from '../store/auth';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	constructor(private store$: Store<RootState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((httpError) => {
				console.log('which iteration');
				const { statusCode } = httpError.error;
				if (statusCode === 401 && !req.url.split('/').includes('refresh') && !req.url.split('/').includes('login')) {
					return this.handleRefresh(req, next);
				}
				return throwError(httpError);
			})
		);
	}

	private handleRefresh(req: HttpRequest<any>, next: HttpHandler) {
		this.store$.dispatch(AuthActions.REFRESH({ payload: { next, req } }));
		return of();
	}
}
