import { Injectable } from '@angular/core';
import PocketBase, { ListResult, RecordModel, RecordService } from 'pocketbase';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { ROOT_USER } from '../root.user';
import { Filter } from '../models/filter.model';

type ApiPayload = { [key: string]: any };

export class HttpError {
  status: number;
  response: any;
  constructor(response: any, status: number) {
    this.response = response;
    this.status = status;
  }
}

@Injectable({ providedIn: 'root' })
export abstract class AbstractApiService<T> {
  abstract readonly COLLECTION_KEY: string;

  protected readonly api = new PocketBase('http://127.0.0.1:8090');
  protected abstract mapper(model: RecordModel): T;

  protected get collection(): RecordService {
    return this.api.collection(this.COLLECTION_KEY);
  }

  protected create(payload: any): Observable<T> {
    return from(
      this.api.collection(this.COLLECTION_KEY).create(payload as ApiPayload)
    ).pipe(
      catchError(({ status, response }) => {
        return throwError(() => new HttpError(response, status));
      }),
      map((model: RecordModel) => this.mapper(model))
    );
  }

  protected list(
    page: number = 1,
    filters?: Filter,
    sorting?: string
  ): Observable<ListResult<T>> {
    const options = {
      filter: this.parseFilters(filters),
      sort: sorting,
    };

    if (!options.sort) {
      delete options.sort;
    }

    return from(
      this.api.collection(this.COLLECTION_KEY).getList(page, 5, options)
    ).pipe(
      map((listResult: ListResult<RecordModel>) =>
        this.recordMapper(listResult)
      )
    );
  }

  protected one(id: string) {
    return from(this.api.collection(this.COLLECTION_KEY).getOne(id)).pipe(
      map((model: RecordModel) => this.mapper(model))
    );
  }

  protected all() {
    return from(
      this.api
        .collection(this.COLLECTION_KEY)
        .getFullList({ filter: `user="${ROOT_USER.id}"` })
    ).pipe(map((records: RecordModel[]) => this.listMapper(records)));
  }

  private recordMapper(records: ListResult<RecordModel>): ListResult<T> {
    return {
      ...records,
      items: records.items.map((item: any) => this.mapper(item)),
    };
  }

  private listMapper(list: RecordModel[]): T[] {
    return list.map((record) => this.mapper(record));
  }

  private parseFilters(filter?: Filter) {
    if (!filter) return undefined;
    if (filter.withUserId) {
      return [
        ...filter.filters,
        { property: 'user', operator: '=', value: ROOT_USER.id },
      ]
        .filter((f) => !!f.value)
        .map((f) => `${f.property}${f.operator}"${f.value}"`)
        .join('&&');
    } else {
      const query = filter.filters
        .filter((f) => !!f.value)
        .map((f) => `${f.property}${f.operator}"${f.value}"`)
        .join('&&');
      return query !== '' ? query : undefined;
    }
  }
}
