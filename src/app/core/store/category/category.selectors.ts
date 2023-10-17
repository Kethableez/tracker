import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_KEY, State } from './category.reducers';

export const selectCategory = createFeatureSelector<State>(FEATURE_KEY);

export const categoryState = createSelector(selectCategory, (state) => state);
export const categories = createSelector(selectCategory, ({ categories }) => categories);
export const isCategoryInProgress = createSelector(selectCategory, ({ inProgress }) => inProgress);
export const isReloadNeeded = createSelector(selectCategory, ({ reloadNeeded }) => reloadNeeded);

export const categoryError = createSelector(selectCategory, ({ error }) => error);
