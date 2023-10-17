import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AuthStoreModule } from '../core/store/auth';
import { NotLoggedInGuard } from '../core/guards/logged-in.guard';

export const AUTH_ROUTES: Route[] = [
	{
		path: 'auth',
		loadComponent: () => import('./auth.component'),
		providers: [importProvidersFrom(AuthStoreModule)],
		canActivate: [NotLoggedInGuard],
		children: [
			{
				path: 'login',
				loadComponent: () => import('./components/login-form/login-form.component')
			},
			{
				path: 'register',
				loadComponent: () => import('./components/register-form/register-form.component')
			},
			{
				path: '**',
				redirectTo: 'login'
			}
		]
	}
];
