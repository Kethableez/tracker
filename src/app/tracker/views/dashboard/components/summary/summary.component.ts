import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { BadgeComponent } from 'src/app/shared/badge/badge.component';

@Pipe({ name: 'currency', standalone: true })
export class CurrencyPipe implements PipeTransform {
  private readonly currencyMap: { [key: string]: string } = {
    PLN: 'zł',
    EUR: '€',
    USD: '$',
  };

  transform(value: number, currency?: string) {
    if (currency) {
      return `${value} ${this.currencyMap[currency]}`.replaceAll('.', ',');
    }
    return `${value}`.replaceAll('.', ',');
  }
}

@Component({
  selector: 'ktbz-dashboard-summary',
  templateUrl: 'summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyPipe, BadgeComponent],
})
export class SummaryComponent implements OnInit {
  @Input() summaryData!: {
    name: string;
    balance: number;
    currency: string;
    income: number;
    outcome: number;
  };

  constructor() {}

  ngOnInit() {
    console.log(this.summaryData);
  }

  get rangeWidth() {
    const { income, outcome } = this.summaryData;
    return Math.round((income * 100) / (income + outcome));
  }
}
