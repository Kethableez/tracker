import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentBase } from '../../../environments/environment.base';
import { Observable } from 'rxjs';
import { AuthPayload } from '../models/auth-payload.model';
import { AccessTokenPayload } from '../models/access-token-payload.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly BASE_URL = environmentBase.apiUrl;
	private readonly RESOURCE = 'auth';
	constructor(private http: HttpClient) {}

	public register(payload: AuthPayload): Observable<any> {
		const url = this.getUrl('');

		return this.http.post(url, payload);
	}

	public usernameAvailibility(username: string): Observable<{ available: boolean }> {
		const url = this.getUrl('available');

		return this.http.get<{ available: boolean }>(url, {
			params: {
				username
			}
		});
	}
	public login(payload: AuthPayload): Observable<AccessTokenPayload> {
		const url = this.getUrl('login');

		return this.http.post<AccessTokenPayload>(url, payload, { withCredentials: true });
	}

	public refreshToken(): Observable<AccessTokenPayload> {
		const url = this.getUrl('refresh');
		return this.http.get<AccessTokenPayload>(url, { withCredentials: true });
	}
	public logout(): Observable<{ revoked: boolean }> {
		const url = this.getUrl('logout');

		return this.http.get<{ revoked: boolean }>(url, { withCredentials: true });
	}

	private getUrl(path: string): string {
		return `${this.BASE_URL}/${this.RESOURCE}/${path}`;
	}
}
