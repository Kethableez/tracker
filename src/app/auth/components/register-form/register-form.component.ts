import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { InputComponent } from '../../../shared/forms/input/input.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../../tracker/core/store/app.states';
import { register } from '../../store/auth.actions';
import { FormService } from '../../../tracker/core/services/form.service';
import { AuthCompletedWithSuccess } from '../../store';
import { filter, tap } from 'rxjs';

@Component({
	selector: 'ktbz-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ReactiveFormsModule, ButtonDirective, InputComponent, RouterModule],
	providers: [FormService]
})
export default class RegisterFormComponent {
	registerForm!: FormGroup;
	isSent!: boolean;

	isRegisterCompleted$ = this.store$.select(AuthCompletedWithSuccess).pipe(
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

	createAccount() {
		this.formService.markAsDirtyAndTouched(this.registerForm);
		if (this.registerForm.valid) {
			const payload = this.registerForm.value;
			this.store$.dispatch(register({ payload }));
			this.isSent = true;
		}
	}

	private initForm() {
		this.registerForm = this.builder.group({
			username: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required)
		});
	}

	private resetForm() {
		this.registerForm.reset();
		this.registerForm.markAsPristine();
		this.registerForm.markAsUntouched();
		this.registerForm.updateValueAndValidity();
		this.cdr.markForCheck();
	}
}
