import { Injectable } from '@angular/core';
import { AbstractApiService } from './api.service';
import { DetailedExpense } from '../models/detailed-expense.model';
import { RecordModel } from 'pocketbase';
import { Filter } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class DetailedExpenseService extends AbstractApiService<DetailedExpense> {
  readonly COLLECTION_KEY = 'detailed_expenses';

  protected mapper(model: RecordModel): DetailedExpense {
    const {
      id,
      name,
      amount,
      type,
      date,
      categoryName,
      categoryColor,
      accountName,
      accountColor,
    } = model;
    return {
      id,
      name,
      amount,
      type,
      date,
      categoryName,
      categoryColor,
      accountName,
      accountColor,
    } as DetailedExpense;
  }

  getList(page = 1, filters?: Filter, sorting?: string) {
    return this.list(page, filters, sorting);
  }
}
