import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NotificationService } from '../../shared/notification/notification.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
	constructor(private notificationService: NotificationService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((httpError) => {
				const { header, message, statusCode } = httpError.error;
				if (statusCode !== 401) {
					this.notificationService.addErrorNotification(header, message);
					return throwError(httpError);
				}
				return next.handle(req);
			})
		);
	}
}
