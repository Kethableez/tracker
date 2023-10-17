import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountReducer, FEATURE_KEY } from './account.reducers';
import { AccountEffects } from './account.effects';

@NgModule({
	imports: [CommonModule, StoreModule.forFeature(FEATURE_KEY, accountReducer), EffectsModule.forFeature([AccountEffects])]
})
export class AccountStoreModule {}
