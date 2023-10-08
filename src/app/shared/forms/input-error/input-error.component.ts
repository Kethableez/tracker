import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ErrorPipe } from './input-error.pipe';

@Component({
  selector: 'ktbz-input-error',
  templateUrl: 'input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ErrorPipe],
})
export class InputErrorComponent {
  @Input() errors!: any;
  @Input() keys: string[] = [];
  constructor() {}

  get errorList() {
    if (this.errors) {
      const parsed = Object.entries(this.errors)
        .map((entry) => ({
          key: entry[0],
          value: entry[1],
        }))
        .filter((errorItem) =>
          this.keys.length ? this.keys.includes(errorItem.key) : true
        );
      parsed.sort();
      return parsed;
    }
    return [];
  }
}
