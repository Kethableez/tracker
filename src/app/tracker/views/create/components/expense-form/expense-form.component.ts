import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { ColorPickerComponent } from 'src/app/shared/forms/color-picker/color-picker.component';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { RadioGroupComponent } from 'src/app/shared/forms/radio-group/radio-group.component';
import { RadioComponent } from 'src/app/shared/forms/radio-group/radio/radio.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Account } from 'src/app/tracker/core/models/account.model';
import { Category } from 'src/app/tracker/core/models/category.model';
import { AccountService } from 'src/app/tracker/core/services/account.service';
import { CategoryService } from 'src/app/tracker/core/services/category.service';
import { ExpenseService } from 'src/app/tracker/core/services/expense.service';
import { FormService } from 'src/app/tracker/core/services/form.service';

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
  ],
  providers: [FormService],
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private expenseService: ExpenseService,
    private notificationService: NotificationService,
    private fs: FormService
  ) {}

  accounts: Account[] = this.accountService.getAll();
  categoriesBase: Category[] = this.categoryService.getAll();

  get categories() {
    return this.categoriesBase.filter(
      (category) => category.type === this.expenseForm.controls['type'].value
    );
  }

  ngOnInit() {
    this.initForm();
    this.cdr.markForCheck();
  }

  addExpense() {
    this.fs.markAsDirtyAndTouched(this.expenseForm);
    if (this.expenseForm.valid) {
      const payload = this.expenseForm.value;
      this.expenseService.addExpense(payload).subscribe((resp) => {
        this.notificationService.addNotification(resp);
      });
      this.expenseForm.reset();
    }
  }

  private initForm() {
    this.expenseForm = this.builder.group({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.min(0)])
      ),
      accountId: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }
}
