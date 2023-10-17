import { Route } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { importProvidersFrom } from '@angular/core';
import { CategoryStoreModule } from '../core/store/category';

export const TRACKER_ROUTES: Route[] = [
	{
		path: 'tracker',
		canActivate: [AuthGuard],
		loadComponent: () => import('./tracker.component').then((tracker) => tracker.TrackerComponent),
		providers: [importProvidersFrom(CategoryStoreModule)],
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./views/dashboard/dashboard.component').then((dashboard) => dashboard.DashboardComponent)
			},
			// {
			//   path: 'list',
			//   loadComponent: () =>
			//     import('./views/list/list.component').then(
			//       (list) => list.CreateComponent
			//     ),
			// },
			{
				path: 'create',
				loadComponent: () => import('./views/create/create.component').then((create) => create.CreateComponent)
			},
			{
				path: '**',
				redirectTo: 'dashboard'
			}
		]
	}
];
