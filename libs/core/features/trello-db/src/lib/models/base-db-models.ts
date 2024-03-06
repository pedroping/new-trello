import { BehaviorSubject, Observable } from 'rxjs';

export interface IConectionValues {
  transaction: IDBTransaction;
  store: IDBObjectStore;
}

export interface IDBService<T> {
  createDataBase: () => void;
  onCreateSuccess: () => () => void;
  onCreateError: () => () => void;
  openRequest: () => IDBOpenDBRequest;
  addNewElement: (element: T) => Observable<string>;
  deleteElement: (id: number) => Observable<string>;
  onUpgradeNeeded: (db: IDBOpenDBRequest) => () => void;
  conectionValues: (db: IDBDatabase) => IConectionValues;
  getAllElements$: () => BehaviorSubject<T[]>;
  getElementById: (id: number) => Observable<T | null | undefined>;
  hasIndexedDB: boolean;
}
