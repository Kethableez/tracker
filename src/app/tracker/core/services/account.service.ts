import { Injectable } from '@angular/core';
import { RecordModel } from 'pocketbase';
import { Account } from '../models/account.model';
import { AbstractApiService, HttpError } from './api.service';
import { ROOT_USER } from '../root.user';

@Injectable({ providedIn: 'root' })
export class AccountService extends AbstractApiService {
  readonly COLLECTION_KEY = 'accounts';

  protected mapper<Account>(model: RecordModel): Account {
    console.log(model);
    return model as unknown as Account;
  }

  addAccount(payload: Omit<Account, 'id'>) {
    return this.create({
      ...payload,
      user: ROOT_USER.id,
    });
  }

  getAll() {
    return [];
  }

  // readonly storageKey = 'ACCOUNT';

  // constructor() {
  //   super();
  // }

  // addAccount(payload: Omit<Account, 'id'>): Observable<ServiceNotification> {
  //   const id = v4();

  //   const accounts = this.getAccounts();

  //   if (!this.notExisting(payload, accounts)) {
  //     return of({
  //       header: 'Konto już istnieje',
  //       message: 'Konto o podanych parametrach już istnieje',
  //       type: 'error',
  //     });
  //   }

  //   this.addOne([...accounts, { id, ...payload }]);
  //   return of({ header: 'Dodano konto', type: 'success' });
  // }

  // getAccounts() {
  //   return this.getAll();
  // }

  // notExisting(accountToAdd: Omit<Account, 'id'>, accounts: Account[]) {
  //   if (!accounts.length) return true;
  //   else {
  //     return !accounts.find((acc) => acc.name === accountToAdd.name);
  //   }
  // }
}
