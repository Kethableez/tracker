import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthPayload } from '../models/auth-payload.model';
import { AccessTokenPayload } from '../models/access-token-payload.model';
import { ApiService } from '../../core/services/api.service';
import { ApiResponse } from '../../core/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
	protected override resourceKey = 'auth';

	constructor(protected override http: HttpClient) {
		super(http);
	}

	public register(payload: AuthPayload): Observable<ApiResponse> {
		const url = this.getUrl('');

		return this.http.post<ApiResponse>(url, payload);
	}

	public usernameAvailibility(username: string): Observable<{ available: boolean }> {
		const url = this.getUrl('available');
		const urlWithParams = this.addQueryParams(url, { username: username });

		return this.http.get<{ available: boolean }>(urlWithParams);
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
}
