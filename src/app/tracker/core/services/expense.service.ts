import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 } from 'uuid';
import { Expense } from '../models/expense.model';
import { ServiceNotification } from '../models/notification.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ExpenseService extends StorageService<Expense> {
  readonly storageKey = 'EXPENSE';

  constructor() {
    super();
  }

  addExpense(payload: Omit<Expense, 'id'>): Observable<ServiceNotification> {
    const id = v4();

    const expenses = this.getExpenses();

    this.addOne([...expenses, { id, ...payload }]);
    return of({ header: 'Dodano wydatek', type: 'success' });
  }

  getExpenses() {
    return this.getAll();
  }

  // notExisting(categoryToAdd: Omit<Expense, 'id'>, categories: Expense[]) {
  //   if (!categories.length) return true;
  //   else {
  //     return !categories.find(
  //       (cat) =>
  //         cat.name === categoryToAdd.name && cat.type === categoryToAdd.type
  //     );
  //   }
  // }
}
