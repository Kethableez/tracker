import { createAction, props } from '@ngrx/store';
import { AuthPayload } from '../models/auth-payload.model';
import { AccessTokenPayload } from '../models/access-token-payload.model';

const makeActionName = (name: string) => {
	return `[Auth] ${name}`;
};
export const login = createAction(makeActionName('Login'), props<{ payload: AuthPayload }>());
export const loginSuccess = createAction(makeActionName('Login success'), props<{ payload: AccessTokenPayload & { userId: number } }>());

export const register = createAction(makeActionName('Register'), props<{ payload: AuthPayload }>());

export const registerSuccess = createAction(makeActionName('Register success'), props<{ header: string; message?: string }>());

export const refresh = createAction(makeActionName('Refresh'));

export const refreshSuccess = createAction(makeActionName('Refresh success'), props<{ payload: AccessTokenPayload }>());

export const logout = createAction(makeActionName('Logout'));
export const logoutSuccess = createAction(makeActionName('Logout success'));

export const authError = createAction(
	makeActionName('Error'),
	props<{ error: { statusCode: number; header: string; message?: string } }>()
);
