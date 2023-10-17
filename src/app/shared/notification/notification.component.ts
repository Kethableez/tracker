import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonDirective } from '../directives/button.directive';
import { slideInOutX } from '../animations/slide-in-out.animation';
import { NotificationActions, NotificationStoreModule } from '../../core/store/notification';
import { Store } from '@ngrx/store';
import { RootState } from '../../core/store/root.state';

@Component({
	selector: 'ktbz-notification',
	templateUrl: 'notification.component.html',
	styleUrls: ['./notification.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, TablerIconsModule, ButtonDirective, NotificationStoreModule],
	animations: [slideInOutX],
	host: { '[@slideInOutX]': 'in' }
})
export class NotificationComponent implements OnInit {
	@Input() id!: number;
	@Input() header?: string;
	@Input() message?: string;
	@Input() type: 'error' | 'success' | 'warning' | 'info' = 'info';
	@Input() withAction = true;
	@Input() closable = true;

	@Output() onAction = new EventEmitter<void>();
	@Output() onClose = new EventEmitter<void>();

	iconsMap: { [key: string]: string } = {
		success: 'circle-check-filled',
		error: 'alert-octagon-filled',
		info: 'alert-circle-filled',
		warning: 'alert-triangle-filled'
	};

	constructor(private store$: Store<RootState>) {}

	ngOnInit() {}

	close() {
		this.store$.dispatch(NotificationActions.CLEAR_SELF({ payload: { index: this.id } }));
	}

	toggleAction() {
		this.onAction.emit();
	}
}
