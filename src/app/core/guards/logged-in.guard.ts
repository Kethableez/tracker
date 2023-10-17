import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../store/root.state';
import { first, map, Observable } from 'rxjs';
import { isLoggedIn } from '../store/auth';

@Injectable({ providedIn: 'root' })
export class NotLoggedInGuard {
	constructor(
		private router: Router,
		private store$: Store<RootState>
	) {}

	canActivate(): Observable<boolean> {
		return this.store$.select(isLoggedIn).pipe(
			first(),
			map((isLoggedIn) => {
				if (isLoggedIn) {
					this.router.navigate(['tracker']);
				}
				return !isLoggedIn;
			})
		);
	}
}
