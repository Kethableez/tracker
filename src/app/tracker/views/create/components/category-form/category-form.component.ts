import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPickerComponent } from 'src/app/shared/forms/color-picker/color-picker.component';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { FormService } from '../../../../../core/services/form.service';
import { RadioGroupComponent } from 'src/app/shared/forms/radio-group/radio-group.component';
import { RadioComponent } from 'src/app/shared/forms/radio-group/radio/radio.component';
import { filter, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store/root.state';
import { NotificationActions } from '../../../../../core/store/notification';
import { CategoryActions, categoryError, isCategoryInProgress } from '../../../../../core/store/category';

@Component({
	selector: 'ktbz-category-form',
	templateUrl: 'category-form.component.html',
	styleUrls: ['./category-form.component.scss'],
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
		RadioComponent
	],
	providers: [FormService]
})
export class CategoryFormComponent implements OnInit {
	categoryForm!: FormGroup;
	isSent = false;

	sentAction$ = this.store$.select(isCategoryInProgress).pipe(
		filter((inProgress) => !inProgress && this.isSent),
		withLatestFrom(this.store$.select(categoryError)),
		tap(([inProgress, error]) => {
			if (!error) {
				this.formService.reset(this.categoryForm, { color: '#d9ddf2' });
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
	}

	addCategory() {
		this.formService.markAsDirtyAndTouched(this.categoryForm);
		if (this.categoryForm.valid) {
			const payload = this.categoryForm.value;
			this.store$.dispatch(NotificationActions.CLEAR_ALL_NOTIFICATIONS());
			this.store$.dispatch(CategoryActions.CREATE({ payload }));
			this.isSent = true;
		}
	}

	private initForm() {
		this.categoryForm = this.builder.group({
			name: new FormControl(null, Validators.required),
			limit: new FormControl(null, Validators.min(0)),
			type: new FormControl(null, Validators.required),
			color: new FormControl('#d9ddf2', Validators.required)
		});
	}
}
