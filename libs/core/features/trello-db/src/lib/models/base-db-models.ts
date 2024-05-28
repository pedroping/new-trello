import { BehaviorSubject, Observable } from 'rxjs';

export interface IConectionValues {
  transaction: IDBTransaction;
  store: IDBObjectStore;
}

export interface IAddNewResponse {
  resp: string;
  id: number;
}

export interface IDBService<T> {
  hasIndexedDB: boolean;
  createDataBase(): void;
  onCreateError(): () => void;
  onCreateSuccess(): () => void;
  clearDb(): Observable<string>;
  openRequest(): IDBOpenDBRequest;
  deleteElement(id: number): Observable<string>;
  onUpgradeNeeded(db: IDBOpenDBRequest): () => void;
  conectionValues(db: IDBDatabase): IConectionValues;
  editElement(element: T): Observable<IAddNewResponse>;
  addNewElement(element: T): Observable<IAddNewResponse>;
  getElementById(id: number): Observable<T | null | undefined>;
  setAllElements?(): void;
  getAllElements$?(): BehaviorSubject<T[]>;
  deleteAllByBlockId?: (id: number) => Observable<string>;
}
