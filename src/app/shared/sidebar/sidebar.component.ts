import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarItemComponent } from './item/sidebar-item.component';
import { AppRoutes, MENU_ITEMS, MenuItem } from './app.routes';

export interface IMenuItem {
  route: MenuItem;
  icon: string;
  children?: { route: MenuItem }[];
}

@Component({
  selector: 'ktbz-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, SidebarItemComponent],
})
export class SidebarComponent implements OnInit {
  appRoutes = MENU_ITEMS;

  constructor() {}

  ngOnInit() {}
}
