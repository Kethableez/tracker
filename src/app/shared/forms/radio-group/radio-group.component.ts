import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { expandCollapse } from '../../animations/expand-collapse.animation';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { AbstractInputBase } from '../directives/abstract-input-base.directive';

@Component({
  selector: 'ktbz-radio-group',
  templateUrl: 'radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupComponent,
      multi: true,
    },
  ],
  animations: [expandCollapse, fadeInOut],
})
export class RadioGroupComponent<T>
  extends AbstractInputBase<T | null>
  implements OnInit
{
  value: T | null = null;

  constructor(
    protected override elRef: ElementRef,
    protected override cdr: ChangeDetectorRef,
    protected override injector: Injector
  ) {
    super(injector, cdr, elRef);
  }
  override doOnFocusFn(): void {}
  override doOnBlurFn(): void {}
  override doOnInit(): void {}

  selectValue(value: T) {
    this.writeValue(value);
    this.doUpdate();
    this.formControl.updateValueAndValidity();
    this.cdr.markForCheck();
  }

  isSelected(value: T) {
    return value === this.controlValue;
  }

  get parentCdr() {
    return this.cdr;
  }
}
