import { NgModule } from '@angular/core';
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
    NotificationsComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
