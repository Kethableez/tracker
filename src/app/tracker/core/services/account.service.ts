import { Injectable } from '@angular/core';
import { RecordModel } from 'pocketbase';
import { Account } from '../models/account.model';
import { ROOT_USER } from '../root.user';
import { AbstractApiService } from './api.service';
import { Filter } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class AccountService extends AbstractApiService<Account> {
  readonly COLLECTION_KEY = 'accounts';

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
}
