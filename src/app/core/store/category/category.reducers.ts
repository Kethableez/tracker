import { Action, createReducer, on } from '@ngrx/store';
import { CLEAR_STATE, CREATE, CREATE_SUCCESS, ERROR, GET_ALL, GET_ALL_SUCCESS } from './category.actions';
import { Category } from '../../models/category.model';

export interface State {
	inProgress: boolean;
	reloadNeeded: boolean;
	categories: Category[];
	error: { header: string; message?: string } | null;
}

export const categoryInitialState: State = {
	inProgress: false,
	reloadNeeded: true,
	categories: [],
	error: null
};

export const categoryReducer = createReducer(
	categoryInitialState,
	on(CREATE_SUCCESS, (state) => ({
		...state,
		reloadNeeded: true,
		inProgress: false,
		error: null
	})),
	on(GET_ALL_SUCCESS, (state, { payload }) => ({
		...state,
		inProgress: false,
		reloadNeeded: false,
		error: null,
		categories: payload as []
	})),
	on(CREATE, GET_ALL, (state) => ({
		...state,
		inProgress: true
	})),
	on(CLEAR_STATE, () => ({
		...categoryInitialState
	})),
	on(ERROR, (state, { payload }) => ({
		...state,
		inProgress: false,
		error: payload
	}))
);

export const FEATURE_KEY = 'category';

export function reducer(state: State | undefined, action: Action) {
	return categoryReducer(state, action);
}
