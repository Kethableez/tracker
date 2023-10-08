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
import { ColorPickerComponent } from 'src/app/shared/forms/color-picker/color-picker.component';
import { ButtonDirective } from 'src/app/shared/directives/button.directive';
import { DropdownComponent } from 'src/app/shared/forms/dropdown/dropdown.component';
import { InputComponent } from 'src/app/shared/forms/input/input.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AccountService } from 'src/app/tracker/core/services/account.service';
import { FormService } from 'src/app/tracker/core/services/form.service';

@Component({
  selector: 'ktbz-account-form',
  templateUrl: 'account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    DropdownComponent,
    ButtonDirective,
    ColorPickerComponent,
  ],
  providers: [FormService],
})
export class AccountFormComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private fs: FormService
  ) {}

  ngOnInit() {
    this.initForm();
    this.cdr.markForCheck();
  }

  currencies = [
    {
      label: 'Złoty',
      value: 'PLN',
    },
    {
      label: 'Euro',
      value: 'EUR',
    },
    {
      label: 'Dolar',
      value: 'USD',
    },
  ];

  addAccount() {
    this.fs.markAsDirtyAndTouched(this.accountForm);
    if (this.accountForm.valid) {
      const payload = this.accountForm.value;
      this.accountService.addAccount(payload).subscribe((resp) => {
        this.notificationService.addNotification(resp);
      });
      this.accountForm.reset();
    }
  }

  private initForm() {
    this.accountForm = this.builder.group({
      balance: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.min(0)])
      ),
      name: new FormControl(null, Validators.required),
      currency: new FormControl(null, Validators.required),
      color: new FormControl('#d9ddf2', Validators.required),
    });
  }
}
