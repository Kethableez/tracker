import { Injectable } from '@angular/core';
import { RecordModel } from 'pocketbase';
import { Account } from '../models/account.model';
import { ROOT_USER } from '../root.user';
import { AbstractApiService } from './api.service';
import { Filter } from '../models/filter.model';
import { AccountBalanceService } from './account-balance.service';
import { map, switchMap } from 'rxjs';
import { AccountBalance } from '../models/account-balance.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  create(payload: any) {
    return this.http.post('http://localhost:3000/account', payload);
  }

  getAll() {}
}
