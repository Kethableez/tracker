import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AbstractInput } from '../directives/abstract-input.directive';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InputErrorComponent } from '../input-error/input-error.component';
import { expandCollapse } from '../../animations/expand-collapse.animation';
import { CalendarComponent } from '../../calendar/calendar.component';

@Component({
  selector: 'ktbz-input',
  templateUrl: 'input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TablerIconsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    InputErrorComponent,
    CalendarComponent,
  ],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
  animations: [expandCollapse],
})
export class InputComponent<T>
  extends AbstractInput<T | null>
  implements OnInit
{
  value: T | null = null;
  isPasswordVisible = false;
  isDatePickerVisible = false;
  // [showMaskTyped]="true"

  // [allowNegativeNumbers]="allowNegative"
  // [outputTransformFn]="outputFn"

  @Input() type: 'text' | 'password' | 'date' | 'numeric' = 'text';
  // @Input() numericType: 'int' | 'dec'
  @ViewChild('input') input!: ElementRef;

  constructor(
    protected override readonly cdr: ChangeDetectorRef,
    protected override readonly injector: Injector,
    protected override readonly elRef: ElementRef
  ) {
    super(injector, cdr, elRef);
  }

  override doOnInit(): void {}

  override doOnFocusFn(): void {
    if (!this.forDisplay && this.type !== 'date') {
      this.input.nativeElement.focus();
    }
  }

  override doOnBlurFn(): void {}

  outputFn = (value: unknown): number | string | null => {
    if (!value || typeof value !== 'string') {
      return null;
    }
    if (this.type === 'numeric') {
      return this.parseNumeric(value);
    } else return this.parseDate(value);
  };

  private parseNumeric(value: string): number {
    return parseFloat(value.replaceAll(',', '.').replaceAll(' ', ''));
  }

  private parseDate(value: string) {
    return `${value}`;
  }

  openDatePicker() {
    if (this.type === 'date') {
      this.isDatePickerVisible = true;
    }
  }

  patchDate(date: Date) {
    this.isDatePickerVisible = false;
    this.writeValue(date as any);
    this.doUpdate();
  }

  get dateValue() {
    return this.value as Date | null;
  }
}
