import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Category } from '../models/category.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ApiService {
	protected override resourceKey = 'category';

	constructor(protected override http: HttpClient) {
		super(http);
	}

	createCategory(payload: Omit<Category, 'id'>) {
		const url = this.getUrl();

		return this.http.post<ApiResponse>(url, payload);
	}

	getAll() {
		const url = this.getUrl();

		return this.http.get<Category[]>(url);
	}

	getOne() {}

	updateCategory() {}

	removeCategory() {}
}
