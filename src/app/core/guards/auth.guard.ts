import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RootState } from '../../tracker/core/store/app.states';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthLoggedIn } from '../../auth/store';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard {
	constructor(private router: Router, private store$: Store<RootState>) {}

	canActivate(): Observable<boolean> {
		return this.store$.select(AuthLoggedIn).pipe(
			map((isLoggedIn) => {
				if (!isLoggedIn) {
					this.router.navigate(['auth', 'login']);
				}
				return isLoggedIn;
			})
		);
	}
}
