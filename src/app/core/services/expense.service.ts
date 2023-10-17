import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';
import { ApiResponse } from '../models/api-response.model';
import { ApiService } from './api.service';
import { Expense } from '../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService extends ApiService {
	protected override resourceKey = 'expense';

	constructor(protected override http: HttpClient) {
		super(http);
	}

	addExpense(payload: Omit<Expense, 'id'>) {
		const url = this.getUrl();

		return this.http.post<ApiResponse>(url, payload);
	}

	getAll() {
		const url = this.getUrl();

		return this.http.get<Expense[]>(url);
	}

	getOne() {}

	updateCategory() {}

	removeCategory() {}
}
