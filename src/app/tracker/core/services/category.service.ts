import { Injectable } from '@angular/core';
import { RecordModel } from 'pocketbase';
import { ROOT_USER } from '../root.user';
import { AbstractApiService } from './api.service';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService extends AbstractApiService {
  readonly COLLECTION_KEY = 'categories';

  protected mapper<Category>(model: RecordModel): Category {
    const { limit, color, type, id, name } = model;
    return { name, limit, color, id, type } as Category;
  }

  addCategory(payload: Omit<Category, 'id'>) {
    return this.create({
      ...payload,
      user: ROOT_USER.id,
    });
  }

  getList(page = 1, filters?: string, sorting?: string) {
    return this.list<Category>(page, filters, sorting);
  }

  getAll() {
    return this.all<Category>();
  }
}
