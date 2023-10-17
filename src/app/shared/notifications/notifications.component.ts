import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { allNotifications, NotificationActions, NotificationStoreModule } from '../../core/store/notification';
import { NotificationComponent } from '../notification/notification.component';
import { ServiceNotification } from '../../core/models/notification.model';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../core/store/root.state';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'ktbz-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, NotificationComponent],
	providers: [NotificationStoreModule, NotificationComponent]
})
export class NotificationsComponent {
	constructor(
		private store$: Store<RootState>,
		private router: Router
	) {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map((event) => event as NavigationEnd),
				filter(({ url, urlAfterRedirects }) => url === urlAfterRedirects)
			)
			.subscribe(() => this.store$.dispatch(NotificationActions.CLEAR_ALL_NOTIFICATIONS()));
	}

	notifications$: Observable<ServiceNotification[]> = this.store$.select(allNotifications);
}
