import { Injectable } from '@angular/core';
import { RecordModel } from 'pocketbase';
import { Account } from '../models/account.model';
import { ROOT_USER } from '../root.user';
import { AbstractApiService } from './api.service';
import { Filter } from '../models/filter.model';
import { AccountBalanceService } from './account-balance.service';
import { map, switchMap } from 'rxjs';
import { AccountBalance } from '../models/account-balance.model';

@Injectable({ providedIn: 'root' })
export class AccountService extends AbstractApiService<Account> {
  readonly COLLECTION_KEY = 'accounts';

  constructor(private balanceService: AccountBalanceService) {
    super();
  }

  protected mapper(model: RecordModel): Account {
    const { balance, color, currency, id, name } = model;
    return { balance, color, currency, id, name } as Account;
  }

  addAccount(payload: Omit<Account, 'id'>) {
    return this.create({
      ...payload,
      user: ROOT_USER.id,
    });
  }

  getList(page = 1, filters?: Filter, sorting?: string) {
    return this.list(page, filters, sorting);
  }

  getAll() {
    return this.all();
  }

  getAccountsWithBalance(page = 1, filters?: Filter, sorting?: string) {
    return this.getList(page, filters, sorting).pipe(
      switchMap((records) => {
        return this.balanceService
          .getByIds(records.items.map((item) => item.id))
          .pipe(
            map((balances) => {
              return {
                ...records,
                items: records.items.map((item) => ({
                  ...item,
                  balance: balances.find(
                    (balance: AccountBalance) => balance.id === item.id
                  )?.balance,
                })),
              };
            })
          );
      })
    );
  }

  getAccountsWithBalanceAsList() {
    return this.getAccountsWithBalance(1, {
      withUserId: true,
      filters: [],
    }).pipe(map((k) => k.items));
  }
}
