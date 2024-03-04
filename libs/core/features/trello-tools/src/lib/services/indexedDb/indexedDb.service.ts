import { Injectable } from '@angular/core';
import { DATA_BASE_NAME } from '../../models/indexedDb.models';

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  request: any;

  constructor() {}

  createDataBase() {
    this.request = window.indexedDB.open(DATA_BASE_NAME, 5);
    this.request.onupgradeneeded = this.onUpgradeneeded;
    this.request.onsuccess = this.onSuccess;
    this.request.onerror = this.onError;
  }

  onSuccess(event: Event) {
    const result = (event.target as IDBRequest<IDBDatabase>).result;
    console.log(result.objectStoreNames, this.request);

    // const customerObjectStore = db
    //   .transaction('customers', 'readwrite')
    //   .objectStore('customers');
  }

  onError(event: Event) {
    console.error('Não foi possivel acessar o IndexedDB');
  }

  onUpgradeneeded(event: Event) {
    const result = (event.target as IDBRequest<IDBDatabase>).result;
    console.log('onUpgradeneeded', this.request);

    const customerObjectStore = result
      .transaction('cards', 'readwrite')
      .objectStore('cards');

    customerObjectStore.add({ teste: 'value', a: 'teste' });
  }
}
