import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store/root.state';
import { accessToken, AuthActions } from '../store/auth';
import { filter, first, tap } from 'rxjs';
import { AuthEffects } from '../store/auth/auth.effects';
import { Router } from '@angular/router';

@Injectable()
export class AuthInitService {
	constructor(private store$: Store<RootState>) {}

	init() {
		return this.store$.select(accessToken).pipe(
			first(),
			filter((token) => !!token),
			tap(() => this.store$.dispatch(AuthActions.REFRESH({})))
		);
	}
}
