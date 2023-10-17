import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPickerComponent } from 'src/app/shared/forms/color-picker/color-picker.component';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { FormService } from '../../../../../core/services/form.service';
import { filter, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store/root.state';
import { AccountActions, accountError, isAccountInProgress } from '../../../../../core/store/account';
import { NotificationActions } from '../../../../../core/store/notification';

@Component({
	selector: 'ktbz-account-form',
	templateUrl: 'account-form.component.html',
	styleUrls: ['./account-form.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ReactiveFormsModule, InputComponent, DropdownComponent, ButtonDirective, ColorPickerComponent],
	providers: [FormService]
})
export class AccountFormComponent implements OnInit {
	accountForm!: FormGroup;
	isSent = false;

	sentAction$ = this.store$.select(isAccountInProgress).pipe(
		filter((inProgress) => !inProgress && this.isSent),
		withLatestFrom(this.store$.select(accountError)),
		tap(([inProgress, error]) => {
			if (!error) {
				this.formService.reset(this.accountForm, { color: '#d9ddf2' });
			}
			this.isSent = false;
			this.cdr.detectChanges();
		})
	);

	constructor(
		private builder: FormBuilder,
		private cdr: ChangeDetectorRef,
		private store$: Store<RootState>,
		private formService: FormService
	) {}

	ngOnInit() {
		this.initForm();
		this.cdr.markForCheck();
	}

	currencies = [
		{
			label: 'Złoty',
			value: 'PLN'
		},
		{
			label: 'Euro',
			value: 'EUR'
		},
		{
			label: 'Dolar',
			value: 'USD'
		}
	];

	addAccount() {
		this.formService.markAsDirtyAndTouched(this.accountForm);
		if (this.accountForm.valid) {
			const payload = this.accountForm.value;
			this.store$.dispatch(NotificationActions.CLEAR_ALL_NOTIFICATIONS());
			this.store$.dispatch(AccountActions.CREATE({ payload }));
			this.isSent = true;
		}
	}

	private initForm() {
		this.accountForm = this.builder.group({
			balance: new FormControl(null, Validators.compose([Validators.required, Validators.min(0)])),
			name: new FormControl(null, Validators.required),
			currency: new FormControl(null, Validators.required),
			color: new FormControl('#d9ddf2', Validators.required)
		});
	}
}
