import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { InputComponent } from '../../../shared/forms/input/input.component';
import { RouterModule } from '@angular/router';
import { FormService } from '../../../core/services/form.service';
import { filter, tap, withLatestFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsernameValidator } from '../../validators/username.validator';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store/root.state';
import { AuthActions, authError, isAuthInProgress } from '../../../core/store/auth';
import { NotificationActions } from '../../../core/store/notification';

@Component({
	selector: 'ktbz-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ReactiveFormsModule, ButtonDirective, InputComponent, RouterModule],
	providers: [FormService]
})
export default class RegisterFormComponent implements OnInit {
	registerForm!: FormGroup;
	isSent = false;

	sentAction$ = this.store$.select(isAuthInProgress).pipe(
		filter((inProgress) => !inProgress && this.isSent),
		withLatestFrom(this.store$.select(authError)),
		tap(([inProgress, error]) => {
			if (!error) {
				this.formService.reset(this.registerForm);
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

	createAccount() {
		this.formService.markAsDirtyAndTouched(this.registerForm);

		if (this.registerForm.valid) {
			const payload = this.registerForm.value;
			this.store$.dispatch(NotificationActions.CLEAR_ALL_NOTIFICATIONS());
			this.store$.dispatch(AuthActions.REGISTER({ payload }));
			this.isSent = true;
		}
	}

	private initForm() {
		this.registerForm = this.builder.group({
			username: new FormControl(null, {
				validators: Validators.compose([Validators.required]),
				asyncValidators: UsernameValidator.create(this.authService, this.cdr),
				updateOn: 'blur'
			}),
			password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)]))
		});
	}
}
