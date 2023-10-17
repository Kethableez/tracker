import { Action, createReducer, on } from '@ngrx/store';
import {
	AUTH_ERROR,
	LOGIN,
	LOGIN_SUCCESS,
	LOGOUT,
	LOGOUT_SUCCESS,
	REFRESH,
	REFRESH_SUCCESS,
	REGISTER,
	REGISTER_SUCCESS
} from './auth.actions';

export interface State {
	inProgress: boolean;
	userId: number | null;
	accessToken: string | null;
	tokenExpiration: Date | null;
	error: { header: string; message?: string } | null;
}

export const authInitialState: State = {
	inProgress: false,
	userId: null,
	accessToken: null,
	tokenExpiration: null,
	error: null
};

export const authReducer = createReducer(
	authInitialState,
	on(LOGIN_SUCCESS, (state, { payload }) => ({
		...state,
		userId: payload.userId,
		accessToken: payload.accessToken,
		tokenExpiration: new Date(payload.expiresAt),
		error: null
	})),

	on(REGISTER_SUCCESS, (state) => ({
		...state,
		inProgress: false,
		error: null
	})),
	on(REFRESH_SUCCESS, (state, { payload }) => ({
		...state,
		userId: payload.token.userId,
		accessToken: payload.token.accessToken,
		tokenExpiration: new Date(payload.token.expiresAt),
		error: null
	})),
	on(LOGOUT_SUCCESS, () => ({
		...authInitialState
	})),
	on(LOGIN, REFRESH, REGISTER, LOGOUT, (state) => ({
		...state,
		inProgress: true
	})),
	on(AUTH_ERROR, (state, { payload }) => ({
		...state,
		inProgress: false,
		error: payload
	}))
);

export const FEATURE_KEY = 'auth';

export function reducer(state: State | undefined, action: Action) {
	return authReducer(state, action);
}
