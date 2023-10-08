import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { expandCollapse } from '../animations/expand-collapse.animation';
import { filter, map, tap } from 'rxjs';
import { APP_ROUTES, AppRoutes, MenuItem } from '../sidebar/app.routes';

export interface Breadcrumb {
  path: string;
  label: string;
}

@Component({
  selector: 'ktbz-breadcrumbs',
  templateUrl: 'breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, TablerIconsModule],
  animations: [expandCollapse],
})
export class BreadcrumbsComponent implements OnInit {
  truncated = false;

  private paths = APP_ROUTES;

  events$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event as NavigationEnd),
    tap((event) => {
      const composedPath = this.composeBreadcrumbs(event.url);
      this.breadcrumbs = composedPath;
      this.activePath = event.url.split('/').at(-1) as string;
    })
  );

  activePath: string = '';
  breadcrumbs: MenuItem[] = [];

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    if (event.target.innerWidth < 575) {
      this.truncated = true;
    } else {
      this.truncated = false;
    }
  }

  private composeBreadcrumbs(url: string) {
    const currentPath = url.split('/').at(-1) as string;
    const item = this.paths.find(
      (menuItem) => menuItem.path === currentPath
    ) as MenuItem;
    console.log(currentPath, item);
    let composedPath = [item];
    if (item?.parent) {
      composedPath = [item.parent, ...composedPath];
    }
    if (item.path !== 'home') {
      return [AppRoutes.HOME, ...composedPath];
    }
    return composedPath;
  }

  @HostListener('document:click', ['$event'])
  private onClick(event: any): void {
    const path = event.path || event.composedPath();
    const inPath = path.find((e: any) => e === this.elRef.nativeElement);

    if (!inPath && this.dropdownState === 'open') {
      this.toggleDropdown('close');
    }
  }

  dropdownState: 'open' | 'close' = 'close';

  constructor(private elRef: ElementRef, private router: Router) {}

  ngOnInit() {}

  toggleDropdown(state?: 'open' | 'close') {
    if (state) {
      this.dropdownState = state;
      return;
    }
    this.dropdownState = this.dropdownState === 'open' ? 'close' : 'open';
  }

  get visibleBreadcrumbs() {
    if (this.breadcrumbs.length > 3) {
      return [
        this.breadcrumbs[0],
        this.breadcrumbs.at(-1),
        this.breadcrumbs.at(-2),
      ] as Breadcrumb[];
    } else {
      return this.breadcrumbs;
    }
  }

  get hiddenBreadcrumbs() {
    if (this.breadcrumbs.length > 3) {
      return this.breadcrumbs.slice(1, -2);
    }
    return [];
  }

  onDropdownLooseFocus() {
    if (this.dropdownState === 'open') {
      this.toggleDropdown('close');
    }
  }
}
