import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { expandCollapse } from '../../animations/expand-collapse.animation';
import { chevronRotate } from '../../animations/chevron-rotate.animation';
import { IMenuItem } from '../sidebar.component';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'ktbz-sidebar-item',
  templateUrl: 'sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, TablerIconsModule],
  animations: [expandCollapse, chevronRotate],
})
export class SidebarItemComponent implements OnInit {
  // @Input() children: string[] = ['Aaa', 'Bbb', 'Ccc'];
  @Input() menuItem!: IMenuItem;

  state: 'opened' | 'closed' = 'closed';

  events$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event as NavigationEnd),
    tap((event) => {
      const currentPath = event.url;
      if (currentPath.includes(this.menuItem.route.path)) {
        this.toggleState('opened');
      } else {
        this.toggleState('closed');
      }
    })
  );

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleState(state?: 'opened' | 'closed') {
    if (!this.menuItem.children) return;
    if (state) {
      this.state = state;
      return;
    }
    this.state = this.state === 'opened' ? 'closed' : 'opened';
  }
}
