import { Injectable } from '@angular/core';
import { RecordModel } from 'pocketbase';
import { Account } from '../models/account.model';
import { ROOT_USER } from '../root.user';
import { AbstractApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AccountService extends AbstractApiService {
  readonly COLLECTION_KEY = 'accounts';

  protected mapper<Account>(model: RecordModel): Account {
    const { balance, color, currency, id, name } = model;
    return { balance, color, currency, id, name } as Account;
  }

  addAccount(payload: Omit<Account, 'id'>) {
    return this.create({
      ...payload,
      user: ROOT_USER.id,
    });
  }

  getList(page = 1, filters?: string, sorting?: string) {
    return this.list<Account>(page, filters, sorting);
  }

  getAll() {
    return this.all<Account>();
  }
}
