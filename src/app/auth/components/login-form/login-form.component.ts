import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { InputComponent } from '../../../shared/forms/input/input.component';
import { RouterModule } from '@angular/router';
import { FormService } from '../../../tracker/core/services/form.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../../tracker/core/store/app.states';
import { login } from '../../store/auth.actions';
import { AuthCompletedWithSuccess } from '../../store';
import { filter, tap } from 'rxjs';

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
	isSent!: boolean;

	isLoginCompleted$ = this.store$.select(AuthCompletedWithSuccess).pipe(
		filter(() => this.isSent),
		tap(() => this.resetForm())
	);

	constructor(
		private builder: FormBuilder,
		private formService: FormService,
		private store$: Store<RootState>,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.isSent = false;
		this.initForm();
	}

	login() {
		this.formService.markAsDirtyAndTouched(this.loginForm);
		if (this.loginForm.valid) {
			const payload = this.loginForm.value;
			this.store$.dispatch(login({ payload }));
			this.isSent = true;
		}
	}

	private initForm() {
		this.loginForm = this.builder.group({
			username: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required)
		});
	}

	private resetForm() {
		this.loginForm.reset();
		this.loginForm.markAsPristine();
		this.loginForm.markAsUntouched();
		this.loginForm.updateValueAndValidity();
		this.cdr.markForCheck();
	}
}
