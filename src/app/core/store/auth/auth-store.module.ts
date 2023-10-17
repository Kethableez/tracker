import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authReducer, FEATURE_KEY } from './auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';

@NgModule({
	imports: [CommonModule, StoreModule.forFeature(FEATURE_KEY, authReducer), EffectsModule.forFeature([AuthEffects])]
})
export class AuthStoreModule {}
