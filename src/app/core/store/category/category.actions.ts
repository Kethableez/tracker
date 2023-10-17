import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';
import { ApiResponse } from '../../models/api-response.model';

export const CREATE = createAction('[CATEGORY] Create', props<{ payload: Omit<Category, 'id'> }>());
export const CREATE_SUCCESS = createAction('[CATEGORY] Create success', props<{ payload: ApiResponse }>());
export const GET_ALL = createAction(
	'[CATEGORY] Get all',
	props<{
		payload: { filters?: any; sorting?: any; paging?: any };
	}>()
);
export const GET_ALL_IF_NEEDED = createAction('[CATEGORY] Get all if needed');

export const GET_ALL_SUCCESS = createAction('[CATEGORY] Get all success', props<{ payload: {} }>());
export const CLEAR_STATE = createAction('[CATEGORY] Clear');
export const ERROR = createAction(
	'[CATEGORY] Error',
	props<{ payload: { header: string; message?: string; showNotification: boolean } }>()
);
