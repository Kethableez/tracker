import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FEATURE_KEY, notificationReducer } from './notification.reducers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(FEATURE_KEY, notificationReducer), EffectsModule.forFeature([])]
})
export class NotificationStoreModule {}
