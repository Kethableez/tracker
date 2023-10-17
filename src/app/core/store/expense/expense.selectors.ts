import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_KEY, State } from './expense.reducers';

export const selectExpense = createFeatureSelector<State>(FEATURE_KEY);

export const expenseState = createSelector(selectExpense, (state) => state);
export const expenses = createSelector(selectExpense, ({ expenses }) => expenses);
export const isExpenseInProgress = createSelector(selectExpense, ({ inProgress }) => inProgress);
export const isReloadNeeded = createSelector(selectExpense, ({ reloadNeeded }) => reloadNeeded);

export const expenseError = createSelector(selectExpense, ({ error }) => error);
