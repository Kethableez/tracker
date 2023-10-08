import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SummaryComponent } from './components/summary/summary.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';

interface DashboardData {
  name: string;
  balance: number;
  currency: string;
  history: HistoryBase[];
}

export interface HistoryBase {
  name: string;
  category: string;
  amount: number;
  date: string;
  type: string;
}
// Fetch current month balance
const dashboardData: DashboardData[] = [
  {
    name: 'Główne',
    balance: 2400.23,
    currency: 'PLN',
    history: [
      {
        name: 'Żabka',
        category: 'Jedzenie',
        amount: 15.99,
        date: '2023-10-07',
        type: 'OUTCOME',
      },
      {
        name: 'Żabka',
        category: 'Papierosy',
        amount: 25,
        date: '2023-10-06',
        type: 'OUTCOME',
      },
      {
        name: 'Żabka',
        category: 'Jedzenie',
        amount: 15.99,
        date: '2023-10-07',
        type: 'OUTCOME',
      },
      {
        name: 'Żabka',
        category: 'Papierosy',
        amount: 25,
        date: '2023-10-06',
        type: 'OUTCOME',
      },
      {
        name: 'Żabka',
        category: 'Jedzenie',
        amount: 15.99,
        date: '2023-10-07',
        type: 'OUTCOME',
      },
      {
        name: 'Żabka',
        category: 'Papierosy',
        amount: 25,
        date: '2023-10-06',
        type: 'OUTCOME',
      },
      {
        name: 'CEZ',
        category: 'Wypłata',
        amount: 4900,
        date: '2023-10-01',
        type: 'INCOME',
      },
    ],
  },
  {
    name: 'Oszczędnościowe',
    balance: 18000.92,
    currency: 'PLN',
    history: [
      {
        name: 'Prowizja',
        category: 'Procent',
        amount: 23,
        date: '2023-10-06',
        type: 'OUTCOME',
      },
      {
        name: 'Przelew',
        category: 'Własne',
        amount: 4900,
        date: '2023-10-01',
        type: 'INCOME',
      },
    ],
  },
  {
    name: 'Walutowe',
    balance: 5000.92,
    currency: 'EUR',
    history: [],
  },
];

@Component({
  selector: 'ktbz-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SummaryComponent, HistoryItemComponent],
})
export class DashboardComponent implements OnInit {
  data: DashboardData[] = dashboardData;

  activeIndex = 0;

  constructor() {}

  ngOnInit() {}

  get summary() {
    const { name, balance, currency, history } = this.data[this.activeIndex];
    const income = history
      .filter((item) => item.type === 'INCOME')
      .reduce((sum, current) => (sum += current.amount), 0);
    const outcome = history
      .filter((item) => item.type === 'OUTCOME')
      .reduce((sum, current) => (sum += current.amount), 0);
    return { name, balance, currency, income, outcome };
  }

  get history() {
    return this.data[this.activeIndex].history;
  }

  next() {
    if (this.activeIndex === 2) {
      this.activeIndex = 0;
    } else {
      this.activeIndex++;
    }
  }
}
