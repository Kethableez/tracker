import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CurrencyPipe, SummaryComponent } from './components/summary/summary.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { ListComponent } from 'src/app/shared/list/list.component';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store/root.state';
import { AuthActions } from '../../../core/store/auth';

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
				type: 'OUTCOME'
			},
			{
				name: 'Żabka',
				category: 'Papierosy',
				amount: 25,
				date: '2023-10-06',
				type: 'OUTCOME'
			},
			{
				name: 'Żabka',
				category: 'Jedzenie',
				amount: 15.99,
				date: '2023-10-07',
				type: 'OUTCOME'
			},
			{
				name: 'Żabka',
				category: 'Papierosy',
				amount: 25,
				date: '2023-10-06',
				type: 'OUTCOME'
			},
			{
				name: 'Żabka',
				category: 'Jedzenie',
				amount: 15.99,
				date: '2023-10-07',
				type: 'OUTCOME'
			},
			{
				name: 'Żabka',
				category: 'Papierosy',
				amount: 25,
				date: '2023-10-06',
				type: 'OUTCOME'
			},
			{
				name: 'CEZ',
				category: 'Wypłata',
				amount: 4900,
				date: '2023-10-01',
				type: 'INCOME'
			}
		]
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
				type: 'OUTCOME'
			},
			{
				name: 'Przelew',
				category: 'Własne',
				amount: 4900,
				date: '2023-10-01',
				type: 'INCOME'
			}
		]
	},
	{
		name: 'Walutowe',
		balance: 5000.92,
		currency: 'EUR',
		history: []
	}
];

@Component({
	selector: 'ktbz-dashboard',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, SummaryComponent, HistoryItemComponent, ListComponent, CurrencyPipe, ButtonDirective]
})
export class DashboardComponent implements OnInit {
	data: DashboardData[] = dashboardData;

	newData: any[] = [];

	activeIndex = 0;

	constructor(
		// private expenseService: ExpenseService,
		// private accountService: AccountService,
		private store$: Store<RootState>,
		private authService: AuthService,
		private cdr: ChangeDetectorRef,
		private router: Router
	) {}

	logout() {
		this.store$.dispatch(AuthActions.LOGOUT());
	}
	ngOnInit() {
		// forkJoin({
		//   accounts: this.accountService.getAccountsWithBalanceAsList(),
		//   mappedExpenses: this.expenseService.getAllForCurrentMonth(),
		// })
		//   .pipe(
		//     map(({ accounts, mappedExpenses }) => {
		//       return accounts.map((account) => ({
		//         ...account,
		//         history: mappedExpenses[account.id],
		//       }));
		//     })
		//   )
		//   .subscribe((accounts) => {
		//     this.newData = accounts;
		//     this.cdr.detectChanges();
		//     console.log(this.newData);
		//   });
	}

	get summary() {
		if (!this.newData[this.activeIndex]) {
			return null;
		}
		const { name, balance, currency, history } = this.newData[this.activeIndex];
		const income = history.filter((item: any) => item.type === 'INCOME').reduce((sum: any, current: any) => (sum += current.amount), 0);
		const outcome = history.filter((item: any) => item.type === 'OUTCOME').reduce((sum: any, current: any) => (sum += current.amount), 0);
		return { name, balance, currency, income, outcome };
	}

	get history() {
		if (!this.newData[this.activeIndex]) {
			return null;
		}
		return this.newData[this.activeIndex].history;
	}

	next() {
		if (this.activeIndex === this.newData.length - 1) {
			this.activeIndex = 0;
		} else {
			this.activeIndex++;
		}
	}
}
