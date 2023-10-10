import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { v4 } from 'uuid';
import { Expense } from '../models/expense.model';
import { ServiceNotification } from '../models/notification.model';
import { StorageService } from './storage.service';
import { AbstractApiService } from './api.service';
import { RecordModel } from 'pocketbase';
import { ROOT_USER } from '../root.user';
import { Filter } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService extends AbstractApiService<Expense> {
  readonly COLLECTION_KEY = 'expenses';

  protected mapper(model: RecordModel): Expense {
    const { id, name, amount, account, type, category, date } = model;
    return { id, name, amount, account, type, category, date } as Expense;
  }

  addExpense(payload: Omit<Expense, 'id'>) {
    return this.create({
      ...payload,
      user: ROOT_USER.id,
    });
  }

  addRebalance(amount: number, account: string) {
    return from(
      this.collection.create({
        name: 'ACCOUNT_REBALANCE',
        user: ROOT_USER.id,
        type: 'REBALANCE',
        account,
        amount,
      })
    );
  }

  getList(page = 1, filters?: Filter, sorting?: string) {
    return this.list(page, filters, sorting);
  }

  getAll() {
    return this.all();
  }

  getAllForCurrentMonth() {
    return from(
      this.collection.getFullList({
        filter: `date >= "2023-10-01 00:00:00"&& user="${ROOT_USER.id}"`,
        sort: 'date',
        expand: 'category',
      })
    ).pipe(
      map((records: RecordModel[]) => {
        console.log(records);
        return records.map((record) => ({
          ...this.mapper(record),
          ...this.expandMapper(record, 'category'),
        }));
      }),
      map(this.remap)
    );
  }

  expandMapper(record: RecordModel, property: string) {
    if (!record.expand) return {};
    const expand = record.expand[property];
    return {
      categoryName: expand['name'],
      categoryColor: expand['color'],
    };
  }

  remap(records: ExtendExpense[]) {
    return records.reduce(
      (exMap: { [key: string]: ExtendExpense[] }, expense: ExtendExpense) => {
        if (exMap[expense.account]) {
          exMap[expense.account].push(expense);
        } else {
          exMap[expense.account] = [expense];
        }
        return exMap;
      },
      {}
    );
  }
}

type ExtendExpense = Expense & {
  categoryName?: string;
  categoryColor?: string;
};
