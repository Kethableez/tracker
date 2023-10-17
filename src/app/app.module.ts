import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { AuthService } from './auth/services/auth.service';
import { initAuthFactory } from './core/interceptors/auth.initializer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HydrationEffects } from './core/store/hydration/hydration.effects';
import { metaReducers } from './core/store/root.state';
import { AuthStoreModule } from './core/store/auth';
import { NotificationStoreModule } from './core/store/notification';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { Router } from '@angular/router';
import { AuthInitService } from './core/interceptors/auth-init.service';
import { CategoryStoreModule } from './core/store/category';
import { AccountStoreModule } from './core/store/account';
import { ExpenseStoreModule } from './core/store/expense';

@NgModule({
	declarations: [AppComponent],
	imports: [
		NotificationsComponent,
		HttpClientModule,
		SharedModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AuthStoreModule,
		NotificationStoreModule,
		CategoryStoreModule,
		AccountStoreModule,
		ExpenseStoreModule,
		StoreModule.forRoot({}, { metaReducers }),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
		EffectsModule.forRoot([HydrationEffects])
	],
	providers: [
		AuthInitService,
		{
			provide: APP_INITIALIZER,
			useFactory: initAuthFactory,
			deps: [AuthInitService],
			multi: true
		},
		// {
		//   provide: HTTP_INTERCEPTORS,
		//   useClass: ApiErrorInterceptor,
		//   multi: true
		// },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RefreshTokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
