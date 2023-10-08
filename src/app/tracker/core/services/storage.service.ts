import { Injectable } from '@angular/core';

export abstract class StorageService<T> {
  abstract storageKey: string;
  protected readonly storage = localStorage;

  constructor() {}

  addOne(objArr: T[]): void {
    this.storage.setItem(this.storageKey, this.stringify(objArr));
  }

  getAll(): T[] {
    const objStr = this.storage.getItem(this.storageKey);
    if (!objStr) return [];
    else {
      return this.parseArr(objStr);
    }
  }

  protected parseObj(obj: string): T {
    return JSON.parse(obj) as T;
  }

  protected parseArr(objs: string): T[] {
    return JSON.parse(objs) as T[];
  }

  protected stringify(objStr: T | T[]): string {
    return JSON.stringify(objStr);
  }
}
