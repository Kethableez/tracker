import { createAction, props } from '@ngrx/store';
import { AuthPayload } from '../../../auth/models/auth-payload.model';
import { AccessTokenPayload } from '../../../auth/models/access-token-payload.model';
import { HttpHandler, HttpRequest } from '@angular/common/http';

export const LOGIN = createAction('[AUTH] Login', props<{ payload: AuthPayload }>());
export const LOGIN_SUCCESS = createAction('[AUTH] Login success', props<{ payload: AccessTokenPayload }>());
export const REGISTER = createAction('[AUTH] Register', props<{ payload: AuthPayload }>());
export const REGISTER_SUCCESS = createAction('[AUTH] Register success', props<{ payload: { header: string; message?: string } }>());
export const REFRESH = createAction('[AUTH] Refresh', props<{ payload?: { req: HttpRequest<any>; next: HttpHandler } }>());
export const REFRESH_SUCCESS = createAction(
	'[AUTH] Refresh success',
	props<{
		payload: {
			token: AccessTokenPayload;
			req?: HttpRequest<any>;
			next?: HttpHandler;
		};
	}>()
);
export const LOGOUT = createAction('[AUTH] Logout');
export const LOGOUT_SUCCESS = createAction('[AUTH] Logout success');
export const AUTH_ERROR = createAction(
	'[AUTH] Error',
	props<{ payload: { header: string; message?: string; showNotification: boolean } }>()
);
