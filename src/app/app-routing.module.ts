import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { GuidelinesComponent } from './views/guidelines/guidelines.component';
import { ColorsComponent } from './views/guidelines/colors/colors.component';
import { ComponentsComponent } from './views/components/components.component';
import { ButtonsComponent } from './views/components/buttons/buttons.component';
import { AppRoutes } from './shared/sidebar/app.routes';
import { ActionButtonsComponent } from './views/components/action-buttons/action-buttons.component';
import { AvatarsComponent } from './views/components/avatar/avatars.component';
import { BadgesComponent } from './views/components/badges/badges.component';
import { CalendarsComponent } from './views/components/calendars/calendars.component';
import { BreadcrumbsComponent } from './views/components/breadcrumbs/breadcrumbs.component';
import { NotificationsComponent } from './views/components/notifications/notifications.component';

import { TRACKER_ROUTES } from './tracker/tracker.routing';

const routes: Routes = [
  ...TRACKER_ROUTES,
  {
    path: AppRoutes.HOME.path,
    component: HomeComponent,
  },
  {
    path: AppRoutes.GUIDELINES.path,
    component: GuidelinesComponent,
    children: [
      {
        path: AppRoutes.COLORS.path,
        component: ColorsComponent,
      },
      {
        path: AppRoutes.TYPOGRAPHY.path,
        component: ColorsComponent,
      },
      {
        path: AppRoutes.SPACING.path,
        component: ColorsComponent,
      },
      {
        path: AppRoutes.BREAKPOINTS.path,
        component: ColorsComponent,
      },
    ],
  },
  {
    path: AppRoutes.COMPONENTS.path,
    component: ComponentsComponent,
    children: [
      {
        path: AppRoutes.ACTION_BUTTON.path,
        component: ActionButtonsComponent,
      },
      {
        path: AppRoutes.AVATAR.path,
        component: AvatarsComponent,
      },
      {
        path: AppRoutes.BADGE.path,
        component: BadgesComponent,
      },
      {
        path: AppRoutes.BUTTON.path,
        component: ButtonsComponent,
      },
      {
        path: AppRoutes.BREADCRUMB.path,
        component: BreadcrumbsComponent,
      },
      {
        path: AppRoutes.CALENDAR.path,
        component: CalendarsComponent,
      },
      {
        path: AppRoutes.NOTIFICATION.path,
        component: NotificationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
