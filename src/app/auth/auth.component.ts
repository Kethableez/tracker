import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonDirective } from '../shared/directives/button.directive';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
	selector: 'ktbz-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, RouterOutlet, ButtonDirective]
})
export default class AuthComponent {
	constructor(private notificationService: NotificationService) {}

	apiCall() {
		// this.notificationService.addInfoNotification('???', '!!!')
	}
}
