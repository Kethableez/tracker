import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((httpError) => {
				const { header, message, statusCode } = httpError.error;
				if (statusCode !== 401) {
					return throwError(httpError);
				}
				return next.handle(req);
			})
		);
	}
}
