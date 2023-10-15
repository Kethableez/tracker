import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './views/home/home.component';
import { GuidelinesComponent } from './views/guidelines/guidelines.component';
import { ColorsComponent } from './views/guidelines/colors/colors.component';
import { ComponentsComponent } from './views/components/components.component';
import { ButtonsComponent } from './views/components/buttons/buttons.component';
import { ActionButtonsComponent } from './views/components/action-buttons/action-buttons.component';
import { AvatarsComponent } from './views/components/avatar/avatars.component';
import { BadgesComponent } from './views/components/badges/badges.component';
import { CalendarsComponent } from './views/components/calendars/calendars.component';
import { BreadcrumbsComponent } from './views/components/breadcrumbs/breadcrumbs.component';
import { NotificationsComponent } from './views/components/notifications/notifications.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './tracker/core/helpers/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HydrationEffects } from './tracker/core/store/hydration/hydration.effects';
import { metaReducers } from './tracker/core/store/app.states';
import { ApiErrorInterceptor } from './core/interceptors/api-error.interceptor';
import { RefreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { AuthStoreModule } from './auth/store';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		GuidelinesComponent,
		ColorsComponent,
		ComponentsComponent,
		ActionButtonsComponent,
		AvatarsComponent,
		BadgesComponent,
		ButtonsComponent,
		BreadcrumbsComponent,
		CalendarsComponent,
		NotificationsComponent
	],
	imports: [
		HttpClientModule,
		SharedModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({}, { metaReducers }),
		EffectsModule.forRoot([HydrationEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
		AuthStoreModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RefreshTokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiErrorInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
