import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../store/app.states';
import { AuthToken } from '../../../auth/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private store$: Store<RootState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.store$.select(AuthToken).pipe(
			switchMap((token) => {
				if (token) {
					req = this.addToken(req, token);
				}
				return next.handle(req);
			})
		);
		// const token = this.storage.getItem('authToken');
		// req = token ? this.addToken(req, token) : req;
		// return next.handle(req);
	}

	private addToken(req: HttpRequest<unknown>, token: string) {
		return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
	}
}
