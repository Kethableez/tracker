import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TRACKER_ROUTES } from './tracker/tracker.routing';
import { AUTH_ROUTES } from './auth/auth.routing';

const routes: Routes = [
  ...TRACKER_ROUTES,
  ...AUTH_ROUTES,
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
