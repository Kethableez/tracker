import { Route } from '@angular/router';

export const TRACKER_ROUTES: Route[] = [
  {
    path: 'tracker',
    loadComponent: () =>
      import('./tracker.component').then((tracker) => tracker.TrackerComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./views/dashboard/dashboard.component').then(
            (dashboard) => dashboard.DashboardComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./views/create/create.component').then(
            (create) => create.CreateComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
