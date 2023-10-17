import { ServiceNotification } from '../../models/notification.model';
import { Action, createReducer, on } from '@ngrx/store';
import { ADD_NOTIFICATION, CLEAR_ALL_NOTIFICATIONS, CLEAR_BY_TYPE, CLEAR_SELF } from './notification.actions';

export interface State {
	notifications: ServiceNotification[];
}

export const notificationInitiaState: State = {
	notifications: []
};

export const notificationReducer = createReducer(
	notificationInitiaState,
	on(ADD_NOTIFICATION, (state, { payload }) => ({
		notifications: [...state.notifications, payload]
	})),
	on(CLEAR_ALL_NOTIFICATIONS, (state) => ({
		notifications: []
	})),
	on(CLEAR_BY_TYPE, (state, { payload }) => ({
		notifications: state.notifications.filter((n) => n.type !== payload.type)
	})),
	on(CLEAR_SELF, (state, { payload }) => ({
		notifications: state.notifications.filter((_, i) => i !== payload.index)
	}))
);

export const FEATURE_KEY = 'notification';

export function reducer(state: State | undefined, action: Action) {
	return notificationReducer(state, action);
}
