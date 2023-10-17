import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { categoryReducer, FEATURE_KEY } from './category.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './category.effects';

@NgModule({
	imports: [CommonModule, StoreModule.forFeature(FEATURE_KEY, categoryReducer), EffectsModule.forFeature([CategoryEffects])]
})
export class CategoryStoreModule {}
