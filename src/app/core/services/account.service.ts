import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { ApiResponse } from '../models/api-response.model';
import { ApiService } from './api.service';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService extends ApiService {
	protected override resourceKey = 'account';

	constructor(protected override http: HttpClient) {
		super(http);
	}

	createAccount(payload: Omit<Account, 'id'>) {
		const url = this.getUrl();

		return this.http.post<ApiResponse>(url, payload);
	}

	getAll() {
		const url = this.getUrl();

		return this.http.get<Account[]>(url);
	}

	getOne() {}

	updateCategory() {}

	removeCategory() {}
}
