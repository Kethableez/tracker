import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { v4 } from 'uuid';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { ServiceNotification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class AccountService extends StorageService<Account> {
  readonly storageKey = 'ACCOUNT';

  constructor() {
    super();
  }

  addAccount(payload: Omit<Account, 'id'>): Observable<ServiceNotification> {
    const id = v4();

    const accounts = this.getAccounts();

    if (!this.notExisting(payload, accounts)) {
      return of({
        header: 'Konto już istnieje',
        message: 'Konto o podanych parametrach już istnieje',
        type: 'error',
      });
    }

    this.addOne([...accounts, { id, ...payload }]);
    return of({ header: 'Dodano konto', type: 'success' });
  }

  getAccounts() {
    return this.getAll();
  }

  notExisting(accountToAdd: Omit<Account, 'id'>, accounts: Account[]) {
    if (!accounts.length) return true;
    else {
      return !accounts.find((acc) => acc.name === accountToAdd.name);
    }
  }
}
