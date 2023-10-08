import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HistoryBase } from '../../dashboard.component';
import { CurrencyPipe } from '../summary/summary.component';

@Component({
  selector: 'ktbz-history-item',
  templateUrl: 'history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyPipe],
})
export class HistoryItemComponent {
  @Input() currency!: string;
  @Input() item!: HistoryBase;

  get amountClass() {
    return this.item.type === 'INCOME' ? 'income' : 'outcome';
  }
}
