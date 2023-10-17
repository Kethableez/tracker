import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../store/root.state';
import { map, Observable, take } from 'rxjs';
import { isLoggedIn } from '../store/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard {
	constructor(
		private router: Router,
		private store$: Store<RootState>
	) {}

	canActivate(): Observable<boolean> {
		return this.store$.select(isLoggedIn).pipe(
			take(1),
			map((isLoggedIn) => {
				if (!isLoggedIn) {
					this.router.navigateByUrl('/auth');
				}
				return isLoggedIn || false;
			})
		);
	}
}
