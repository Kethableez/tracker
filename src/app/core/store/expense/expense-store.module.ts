import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expenseReducer, FEATURE_KEY } from './expense.reducers';
import { ExpenseEffects } from './expense.effects';

@NgModule({
	imports: [CommonModule, StoreModule.forFeature(FEATURE_KEY, expenseReducer), EffectsModule.forFeature([ExpenseEffects])]
})
export class ExpenseStoreModule {}
