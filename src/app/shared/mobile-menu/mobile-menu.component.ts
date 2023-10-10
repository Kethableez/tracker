import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonDirective } from '../directives/button.directive';
import { TablerIconsModule } from 'angular-tabler-icons';
import { environmentBase } from 'src/environments/environment.base';

@Component({
  selector: 'ktbz-mobile-menu',
  templateUrl: 'mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ButtonDirective, TablerIconsModule],
})
export class MobileMenuComponent implements OnInit {
  menuItems = environmentBase.menuItems;

  constructor() {}

  ngOnInit() {}
}
