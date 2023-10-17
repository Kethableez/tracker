import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_KEY, State } from './account.reducers';

export const selecAccount = createFeatureSelector<State>(FEATURE_KEY);

export const accountState = createSelector(selecAccount, (state) => state);
export const accounts = createSelector(selecAccount, ({ accounts }) => accounts);
export const isAccountInProgress = createSelector(selecAccount, ({ inProgress }) => inProgress);
export const isReloadNeeded = createSelector(selecAccount, ({ reloadNeeded }) => reloadNeeded);

export const accountError = createSelector(selecAccount, ({ error }) => error);
