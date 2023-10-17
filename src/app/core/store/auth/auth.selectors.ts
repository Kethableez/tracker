import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Auth from './auth.reducers';

export const selectAuth = createFeatureSelector<Auth.State>(Auth.FEATURE_KEY);
export const authState = createSelector(selectAuth, (state) => state);
export const isLoggedIn = createSelector(selectAuth, ({ userId, accessToken, tokenExpiration }) => {
	if (tokenExpiration) {
		return !!userId && !!accessToken && new Date(tokenExpiration).getTime() > new Date().getTime();
	} else return false;
});
export const currentUserId = createSelector(selectAuth, ({ userId }) => userId);
export const tokenExpiration = createSelector(selectAuth, ({ tokenExpiration }) => tokenExpiration);

export const accessToken = createSelector(selectAuth, ({ accessToken }) => accessToken);
export const isAuthInProgress = createSelector(selectAuth, ({ inProgress }) => inProgress);
export const authError = createSelector(selectAuth, ({ error }) => error);
