import { createAction, props } from '@ngrx/store';
import { ApiResponse } from '../../models/api-response.model';
import { Expense } from '../../models/expense.model';

export const CREATE = createAction('[EXPENSE] Create', props<{ payload: Omit<Expense, 'id'> }>());
export const CREATE_SUCCESS = createAction('[EXPENSE] Create success', props<{ payload: ApiResponse }>());
export const GET_ALL = createAction(
	'[EXPENSE] Get all',
	props<{
		payload: { filters?: any; sorting?: any; paging?: any };
	}>()
);
export const GET_ALL_IF_NEEDED = createAction('[EXPENSE] Get all if needed');
export const GET_ALL_SUCCESS = createAction('[EXPENSE] Get all success', props<{ payload: Expense[] }>());
export const CLEAR_STATE = createAction('[EXPENSE] Clear');
export const ERROR = createAction('[EXPENSE] Error', props<{ payload: { header: string; message?: string; showNotification: boolean } }>());
