import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPickerComponent } from 'src/app/shared/forms/color-picker/color-picker.component';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AccountService } from 'src/app/tracker/core/services/account.service';
import { FormService } from 'src/app/tracker/core/services/form.service';
import { RadioGroupComponent } from 'src/app/shared/forms/radio-group/radio-group.component';
import { RadioComponent } from 'src/app/shared/forms/radio-group/radio/radio.component';
import { CategoryService } from 'src/app/tracker/core/services/category.service';
import { SomeService } from '../../../../core/services/kurwa.service';

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

	constructor(
		private builder: FormBuilder,
		private cdr: ChangeDetectorRef,
		private categoryService: CategoryService,
		private notificationService: NotificationService,
		private fs: FormService,
		private kurwa: SomeService
	) {}

	ngOnInit() {
		this.initForm();
		this.cdr.markForCheck();
	}

	addCategory() {
		this.fs.markAsDirtyAndTouched(this.categoryForm);
		if (this.categoryForm.valid) {
			this.notificationService.removeAll();
			const payload = this.categoryForm.value;
			this.categoryService.create(payload).subscribe({
				next: (v) => console.log(v),
				error: (err) => console.log(err),
				complete: () => {
					this.categoryForm.reset();
					this.categoryForm.updateValueAndValidity();
					this.cdr.markForCheck();
				}
			});
		}
	}

	testAuth() {
		this.kurwa.getCategories().subscribe(() => {});
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
