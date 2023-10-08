import { NgModule } from '@angular/core';
import { ButtonDirective } from './directives/button.directive';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { BadgeComponent } from './badge/badge.component';
import { BadgeContainerDirective } from './directives/badge-container.directive';
import { AvatarComponent } from './avatar/avatar.component';
import { ActionButtonDirective } from './directives/action-button.directive';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { NotificationComponent } from './notification/notification.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SegmentedTabsComponent } from './segmented-tabs/segmented-tabs.component';

const COMPONENTS = [
  AvatarComponent,
  BadgeComponent,
  MobileMenuComponent,
  SegmentedTabsComponent,
];

const DIRECTIVES = [
  ActionButtonDirective,
  ButtonDirective,
  BadgeContainerDirective,
  BreadcrumbsComponent,
  CalendarComponent,
  SidebarComponent,
  NotificationComponent,
  PageTitleComponent,
];

@NgModule({
  imports: [TablerIconsModule.pick(TablerIcons), ...COMPONENTS, ...DIRECTIVES],
  exports: [TablerIconsModule, ...COMPONENTS, ...DIRECTIVES],
})
export class SharedModule {}
