import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
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
}
