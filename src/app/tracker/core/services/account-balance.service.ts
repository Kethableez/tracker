import { Injectable } from '@angular/core';
import { AbstractApiService } from './api.service';
import { AccountBalance } from '../models/account-balance.model';
import { ListResult, RecordModel } from 'pocketbase';
import { from, map } from 'rxjs';
import { ROOT_USER } from '../root.user';

@Injectable({ providedIn: 'root' })
export class AccountBalanceService extends AbstractApiService<AccountBalance> {
  readonly COLLECTION_KEY = 'account_balances';
  protected mapper(record: RecordModel): AccountBalance {
    const { id, balance } = record;
    return { id, balance } as AccountBalance;
  }

  getOne(id: string) {
    return this.one(id);
  }

  getByIds(ids: string[]) {
    const filterQuery = ids
      .map((id) => `id="${id}"&&user="${ROOT_USER.id}"`)
      .join('||');
    return from(this.collection.getFullList({ filter: filterQuery })).pipe(
      map((records: RecordModel[]) =>
        records.map((record: RecordModel) => this.mapper(record))
      )
    );
  }
}
