import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { exhaustMap, first, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../store/root.state';
import { accessToken } from '../store/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private store$: Store<RootState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.store$.select(accessToken).pipe(
			first(),
			exhaustMap((token) => {
				if (token) {
					req = this.addToken(req, token);
				}
				return next.handle(req);
			})
		);
	}

	private addToken(req: HttpRequest<unknown>, token: string) {
		return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
	}
}
