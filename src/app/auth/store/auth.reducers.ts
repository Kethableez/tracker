import { Action, createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutSuccess, refreshSuccess, registerSuccess, authError, register, login, refresh, logout } from './auth.actions';
export interface State {
	isLoggedIn: boolean;
	inProgress: boolean;
	userId: number | null;
	accessToken: string | null;
	error: {} | null;
}

export const initialState: State = {
	isLoggedIn: false,
	inProgress: false,
	userId: null,
	accessToken: null,
	error: null
};

export const authReducer = createReducer(
	initialState,
	on(loginSuccess, (state, { payload }) => ({
		...state,
		isLoggedIn: true,
		inProgress: false,
		userId: payload.userId,
		accessToken: payload.accessToken,
		error: null
	})),
	on(registerSuccess, (state, action) => ({
		...state,
		inProgress: false
	})),
	on(refreshSuccess, (state, { payload }) => ({
		...state,
		accessToken: payload.accessToken,
		inProgress: false
	})),
	on(logoutSuccess, (state, action) => ({
		...initialState,
		inProgress: false
	})),
	on(register, login, refresh, logout, (state) => ({
		...state,
		inProgress: true,
		error: null
	})),
	on(authError, (state, { error }) => ({
		...state,
		inProgress: false,
		error: error
	}))
);

export const authFeatureKey = 'auth';

export function reducer(state: State | undefined, action: Action) {
	return authReducer(state, action);
}
