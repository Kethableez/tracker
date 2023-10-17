import * as Notification from './notification.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectNotification = createFeatureSelector<Notification.State>(Notification.FEATURE_KEY);
export const notifiationState = createSelector(selectNotification, (state) => state);
export const allNotifications = createSelector(notifiationState, ({ notifications }) => notifications);
