import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnInit
} from '@angular/core';
import { ButtonDirective } from '../../directives/button.directive';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AbstractInput } from '../directives/abstract-input.directive';
import { TablerIconsModule } from 'angular-tabler-icons';
import { InputErrorComponent } from '../input-error/input-error.component';
import { expandCollapse } from '../../animations/expand-collapse.animation';

@Component({
  selector: 'ktbz-color-picker',
  templateUrl: 'color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonDirective,
    TablerIconsModule,
    InputErrorComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerComponent,
      multi: true
    }
  ],
  animations: [expandCollapse]
})
export class ColorPickerComponent
  extends AbstractInput<string | null>
  implements OnInit {
  value: string | null = null;

  constructor(
    protected override readonly injector: Injector,
    protected override readonly elRef: ElementRef
  ) {
    super(injector, elRef);
  }

  override doOnInit(): void {
  }

  override doOnFocusFn(): void {
  }

  override doOnBlurFn(): void {
  }

  getRandomColor() {
    const h = Math.floor(Math.random() * 360);
    const hex = this.hslToHex(h);
    this.writeValue(hex);
    this.doUpdate();
  }

  hslToHex(h: number) {
    let s = 50;
    let l = 90;
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
}
