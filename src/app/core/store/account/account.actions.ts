import { createAction, props } from '@ngrx/store';
import { Account } from '../../models/account.model';
import { ApiResponse } from '../../models/api-response.model';

export const CREATE = createAction('[ACCOUNT] Create', props<{ payload: Omit<Account, 'id'> }>());
export const CREATE_SUCCESS = createAction('[ACCOUNT] Create success', props<{ payload: ApiResponse }>());
export const GET_ALL = createAction(
	'[ACCOUNT] Get all',
	props<{
		payload: { filters?: any; sorting?: any; paging?: any };
	}>()
);
export const GET_ALL_IF_NEEDED = createAction('[ACCOUNT] Get all if needed');
export const GET_ALL_SUCCESS = createAction('[ACCOUNT] Get all success', props<{ payload: Account[] }>());
export const CLEAR_STATE = createAction('[ACCOUNT] Clear');
export const ERROR = createAction('[ACCOUNT] Error', props<{ payload: { header: string; message?: string; showNotification: boolean } }>());
