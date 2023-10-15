import { Injectable } from '@angular/core';
import { RecordModel } from 'pocketbase';
import { ROOT_USER } from '../root.user';
import { AbstractApiService } from './api.service';
import { Category } from '../models/category.model';
import { Filter } from '../models/filter.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}

  create(payload: any) {
    return this.http.post('http://localhost:3000/category', payload);
  }

  getAll() {}
}
