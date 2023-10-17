import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { ColorPickerComponent } from 'src/app/shared/forms/color-picker/color-picker.component';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { RadioGroupComponent } from 'src/app/shared/forms/radio-group/radio-group.component';
import { RadioComponent } from 'src/app/shared/forms/radio-group/radio/radio.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { Currency } from '../../../../../core/enums/currencies.enum';
import { Account } from '../../../../../core/models/account.model';
import { Category } from '../../../../../core/models/category.model';
import { FormService } from '../../../../../core/services/form.service';
import { environmentBase } from 'src/environments/environment.base';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store/root.state';
import { categories, CategoryActions } from '../../../../../core/store/category';
import { AccountActions, accounts } from '../../../../../core/store/account';
import { filter, map, Observable, tap, withLatestFrom } from 'rxjs';
import { ExpenseActions, expenseError, isExpenseInProgress } from '../../../../../core/store/expense';
import { NotificationActions } from '../../../../../core/store/notification';

@Component({
	selector: 'ktbz-expense-form',
	templateUrl: 'expense-form.component.html',
	styleUrls: ['./expense-form.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputComponent,
		DropdownComponent,
		ButtonDirective,
		ColorPickerComponent,
		RadioGroupComponent,
		RadioComponent,
		NotificationComponent
	],
	providers: [FormService]
})
export class ExpenseFormComponent implements OnInit {
	expenseForm!: FormGroup;
	isSent = false;

	sentAction$ = this.store$.select(isExpenseInProgress).pipe(
		filter((inProgress) => !inProgress && this.isSent),
		withLatestFrom(this.store$.select(expenseError)),
		tap(([inProgress, error]) => {
			if (!error) {
				this.formService.reset(this.expenseForm);
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

	accounts$: Observable<Account[]> = this.store$.select(accounts);
	baseCategories$: Observable<Category[]> = this.store$.select(categories);

	defaultCurrency = Currency.PLN;

	currencies = environmentBase.currencies;

	get categories$() {
		return this.baseCategories$.pipe(
			map((categories) => categories.filter((category) => category.type === this.expenseForm.controls['type'].value))
		);
	}

	ngOnInit() {
		this.initForm();
		this.store$.dispatch(CategoryActions.GET_ALL_IF_NEEDED());
		this.store$.dispatch(AccountActions.GET_ALL_IF_NEEDED());
		this.cdr.markForCheck();
	}

	addExpense() {
		this.formService.markAsDirtyAndTouched(this.expenseForm);
		if (this.expenseForm.valid) {
			const payload = this.expenseForm.value;
			this.store$.dispatch(NotificationActions.CLEAR_ALL_NOTIFICATIONS());
			this.store$.dispatch(ExpenseActions.CREATE({ payload }));
			this.isSent = true;
		}
		// if (this.expenseForm.valid) {
		//   this.notificationService.removeAll();
		//   const payload = this.expenseForm.value;
		//   this.expenseService.addExpense(payload).subscribe({
		//     next: () =>
		//       this.notificationService.addSuccessNotification('Dodano wydatek'),
		//     error: ({ status, response }) =>
		//       this.notificationService.addErrorNotification(
		//         'Błąd',
		//         'Nie można dodać wydatku'
		//       ),
		//     complete: () => {
		//       this.expenseForm.reset();
		//       this.expenseForm.updateValueAndValidity();
		//       this.cdr.markForCheck();
		//     },
		//   });
		// }
	}

	// get hasSelectedAccountDifferentCurrency() {
	// 	const { account } = this.expenseForm.value;
	// 	if (!account) return false;
	// 	// return this.accounts.find((acc) => acc.id === account)?.currency !== this.defaultCurrency;
	// }

	private initForm() {
		this.expenseForm = this.builder.group({
			name: new FormControl(null, Validators.required),
			amount: new FormControl(null, Validators.compose([Validators.required, Validators.min(0)])),
			type: new FormControl(null, Validators.required),
			date: new FormControl(null, Validators.required),
			hasDefaultCurrency: new FormControl(true),
			currency: new FormControl('PLN'),
			accountId: new FormControl(null, Validators.required),
			categoryId: new FormControl(null, Validators.required)
			// changeCurrency: new FormControl(null),
			// currency: new FormControl(null)
		});
	}
}
