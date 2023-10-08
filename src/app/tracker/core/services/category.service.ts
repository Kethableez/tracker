import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 } from 'uuid';
import { Category } from '../models/category.model';
import { ServiceNotification } from '../models/notification.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CategoryService extends StorageService<Category> {
  readonly storageKey = 'CATEGORY';

  constructor() {
    super();
  }

  addAccount(payload: Omit<Category, 'id'>): Observable<ServiceNotification> {
    const id = v4();

    const categories = this.getCategories();

    if (!this.notExisting(payload, categories)) {
      return of({
        header: 'Kategoria już istnieje',
        message: 'Kategoria o podanych parametrach już istnieje',
        type: 'error',
      });
    }

    this.addOne([...categories, { id, ...payload }]);
    return of({ header: 'Dodano kategorię', type: 'success' });
  }

  getCategories() {
    return this.getAll();
  }

  notExisting(categoryToAdd: Omit<Category, 'id'>, categories: Category[]) {
    if (!categories.length) return true;
    else {
      return !categories.find(
        (cat) =>
          cat.name === categoryToAdd.name && cat.type === categoryToAdd.type
      );
    }
  }
}
