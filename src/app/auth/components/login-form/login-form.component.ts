import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { InputComponent } from '../../../shared/forms/input/input.component';
import { RouterModule } from '@angular/router';
import { FormService } from '../../../core/services/form.service';
import { filter, tap, withLatestFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store/root.state';
import { NotificationActions } from '../../../core/store/notification';
import { AuthActions, authError, isAuthInProgress } from '../../../core/store/auth';

@Component({
	selector: 'ktbz-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ReactiveFormsModule, ButtonDirective, InputComponent, RouterModule],
	providers: [FormService]
})
export default class LoginFormComponent implements OnInit {
	loginForm!: FormGroup;
	isSent = false;

	sentAction$ = this.store$.select(isAuthInProgress).pipe(
		filter((inProgress) => !inProgress && this.isSent),
		withLatestFrom(this.store$.select(authError)),
		tap(([inProgress, error]) => {
			if (!error) {
				this.formService.reset(this.loginForm);
			}
			this.isSent = false;
			this.cdr.markForCheck();
		})
	);

	constructor(
		private builder: FormBuilder,
		private formService: FormService,
		private cdr: ChangeDetectorRef,
		private authService: AuthService,
		private store$: Store<RootState>
	) {}

	ngOnInit() {
		this.initForm();
	}

	login() {
		this.formService.markAsDirtyAndTouched(this.loginForm);
		if (this.loginForm.valid) {
			const payload = this.loginForm.value;
			this.store$.dispatch(NotificationActions.CLEAR_ALL_NOTIFICATIONS());
			this.store$.dispatch(AuthActions.LOGIN({ payload }));
			this.isSent = true;
		}
	}

	private initForm() {
		this.loginForm = this.builder.group({
			username: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required)
		});
	}
}
