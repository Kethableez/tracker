import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentBase } from '../../../environments/environment.base';

@Injectable({ providedIn: 'root' })
export abstract class ApiService {
	private apiUrl = environmentBase.apiUrl;
	protected abstract resourceKey: string;
	constructor(protected http: HttpClient) {}

	protected getUrl(path?: string) {
		const pathArr = [this.apiUrl, this.resourceKey];

		if (path) {
			pathArr.push(path);
		}
		return pathArr.join('/');
	}

	protected addQueryParams(url: string, params?: object) {
		if (params) {
			const queryStr = Object.entries(params)
				.map(([key, value]) => `${key}=${value}`)
				.join('&');
			return [url, queryStr].join('?');
		}
		return url;
	}
}
