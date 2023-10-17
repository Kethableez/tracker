import { Observable } from 'rxjs';
import { AuthInitService } from './auth-init.service';

export function initAuthFactory(authInitService: AuthInitService): () => Observable<any> {
	return () => authInitService.init();
}
