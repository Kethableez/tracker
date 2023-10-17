import { createAction, props } from '@ngrx/store';
import { ServiceNotification } from '../../models/notification.model';

export const ADD_NOTIFICATION = createAction('[NOTIFICATION] ADD', props<{ payload: ServiceNotification}>());

export const CLEAR_ALL_NOTIFICATIONS = createAction('[NOTIFICATION] Clear all');

export const CLEAR_BY_TYPE = createAction('[NOTIFICATION] Clear by type', props<{ payload: { type: 'error' | 'success' | 'warning' | 'info' }}>())

export const CLEAR_SELF = createAction('[NOTIFICATION] Clear self', props<{ payload: { index: number }}>())

