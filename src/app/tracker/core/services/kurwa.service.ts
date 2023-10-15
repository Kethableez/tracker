import { Injectable } from '@angular/core';
import { environmentBase } from '../../../../environments/environment.base';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SomeService {
	private readonly BASE_URL = environmentBase.apiUrl;
	private readonly RESOURCE = 'category';
	constructor(private http: HttpClient) {}

	public getCategories() {
		const url = this.getUrl();
		return this.http.get(url);
	}

	private getUrl(path?: string): string {
		return `${this.BASE_URL}/${this.RESOURCE}/${path || ''}`;
	}
}
