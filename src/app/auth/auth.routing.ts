import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AuthStoreModule } from './store';

export const AUTH_ROUTES: Route[] = [
	{
		path: 'auth',
		loadComponent: () => import('./auth.component'),
		providers: [importProvidersFrom(AuthStoreModule)],
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
