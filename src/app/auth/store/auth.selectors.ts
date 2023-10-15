import * as Auth from './auth.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuth = createFeatureSelector<Auth.State>(Auth.authFeatureKey);

export const AuthState = createSelector(selectAuth, (state) => state);

export const AuthError = createSelector(selectAuth, ({ error }) => error);

export const AuthLoggedIn = createSelector(selectAuth, ({ userId, accessToken }) => !!userId && !!accessToken);

export const AuthToken = createSelector(selectAuth, ({ accessToken }) => accessToken);
export const AuthInProgress = createSelector(selectAuth, ({ inProgress }) => inProgress);

export const AuthCompletedWithSuccess = createSelector(selectAuth, ({ inProgress, error }) => !inProgress && !error);

export const AuthCompletedWithError = createSelector(selectAuth, ({ inProgress, error }) => !inProgress && error);
