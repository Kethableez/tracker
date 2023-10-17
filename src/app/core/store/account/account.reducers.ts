import { Account } from '../../models/account.model';
import { Action, createReducer, on } from '@ngrx/store';
import { CLEAR_STATE, CREATE, CREATE_SUCCESS, ERROR, GET_ALL, GET_ALL_SUCCESS } from './account.actions';

export interface State {
	inProgress: boolean;
	reloadNeeded: boolean;
	accounts: Account[];
	error: { header: string; message?: string } | null;
}

export const accountInitialState: State = {
	inProgress: false,
	reloadNeeded: true,
	accounts: [],
	error: null
};

export const accountReducer = createReducer(
	accountInitialState,
	on(CREATE_SUCCESS, (state) => ({
		...state,
		inProgress: false,
		reloadNeeded: true,
		error: null
	})),
	on(GET_ALL_SUCCESS, (state, { payload }) => ({
		...state,
		inProgress: false,
		reloadNeeded: false,
		error: null,
		accounts: payload as []
	})),
	on(CREATE, GET_ALL, (state) => ({
		...state,
		inProgress: true
	})),
	on(CLEAR_STATE, () => ({
		...accountInitialState
	})),
	on(ERROR, (state, { payload }) => ({
		...state,
		inProgress: false,
		error: payload
	}))
);

export const FEATURE_KEY = 'account';

export function reducer(state: State | undefined, action: Action) {
	return accountReducer(state, action);
}
