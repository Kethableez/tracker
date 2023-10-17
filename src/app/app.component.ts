import { Component } from '@angular/core';
import { RootState } from './core/store/root.state';
import { Store } from '@ngrx/store';
import { NotificationActions } from './core/store/notification';

@Component({
	selector: 'ktbz-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'playground';
	constructor(private store$: Store<RootState>) {
		this.store$.dispatch(NotificationActions.CLEAR_ALL_NOTIFICATIONS());
	}
}
