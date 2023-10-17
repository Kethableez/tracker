import { Action, createReducer, on } from '@ngrx/store';
import { Expense } from '../../models/expense.model';
import { CLEAR_STATE, CREATE, CREATE_SUCCESS, ERROR, GET_ALL, GET_ALL_SUCCESS } from './expense.actions';

export interface State {
	inProgress: boolean;
	reloadNeeded: boolean;
	expenses: Expense[];
	error: { header: string; message?: string } | null;
}

export const expenseInitialState: State = {
	inProgress: false,
	reloadNeeded: true,
	expenses: [],
	error: null
};

export const expenseReducer = createReducer(
	expenseInitialState,
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
		expenses: payload as []
	})),
	on(CREATE, GET_ALL, (state) => ({
		...state,
		inProgress: true
	})),
	on(CLEAR_STATE, () => ({
		...expenseInitialState
	})),
	on(ERROR, (state, { payload }) => ({
		...state,
		inProgress: false,
		error: payload
	}))
);

export const FEATURE_KEY = 'expense';

export function reducer(state: State | undefined, action: Action) {
	return expenseReducer(state, action);
}
