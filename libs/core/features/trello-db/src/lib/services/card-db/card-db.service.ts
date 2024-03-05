import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CardDbService {
  // implements IDBService<Icard>
  hasIndexedDB = !!window.indexedDB;
  createDataBase() {}
  addNewElement() {}
}
