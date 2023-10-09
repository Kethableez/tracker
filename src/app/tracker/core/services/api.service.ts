import { Injectable } from '@angular/core';
import PocketBase, { ListResult, RecordModel } from 'pocketbase';
import { Observable, catchError, from, map, throwError } from 'rxjs';

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
export abstract class AbstractApiService {
  abstract readonly COLLECTION_KEY: string;

  protected readonly api = new PocketBase('http://127.0.0.1:8090');
  protected abstract mapper<T>(model: RecordModel): T;

  protected create<T>(payload: T): Observable<any> {
    return from(
      this.api.collection(this.COLLECTION_KEY).create(payload as ApiPayload)
    ).pipe(
      catchError(({ status, response }) => {
        return throwError(() => new HttpError(response, status));
      }),
      map((model: RecordModel) => this.mapper(model))
    );
  }

  protected list<T>(
    page: number = 1,
    filters?: string,
    sorting?: string
  ): Observable<ListResult<T>> {
    const options = {
      filter: filters,
      sort: sorting,
    };

    if (!options.filter) {
      delete options.filter;
    }

    if (!options.sort) {
      delete options.sort;
    }

    return from(
      this.api.collection(this.COLLECTION_KEY).getList(page, 5, options)
    ).pipe(
      map((listResult: ListResult<RecordModel>) =>
        this.recordMapper<T>(listResult)
      )
    );
  }

  protected all<T>() {
    return from(this.api.collection(this.COLLECTION_KEY).getFullList()).pipe(
      map((records: RecordModel[]) => this.listMapper<T>(records))
    );
  }

  private recordMapper<T>(records: ListResult<RecordModel>): ListResult<T> {
    return {
      ...records,
      items: records.items.map((item: any) => this.mapper<T>(item)),
    };
  }

  private listMapper<T>(list: RecordModel[]): T[] {
    return list.map((record) => this.mapper(record));
  }
}
