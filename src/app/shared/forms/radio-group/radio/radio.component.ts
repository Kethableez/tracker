import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Host,
  Input,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'ktbz-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['./radio.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RadioGroupComponent],
})
export class RadioComponent<T> {
  @Input() value!: T;
  constructor(@Host() public radioGroup: RadioGroupComponent<T>) {}
}
