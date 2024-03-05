import { Injectable } from '@angular/core';
import {
  CARDS_DATA_BASE_NAME,
  CARDS_STORE_NAME,
  CARD_BLOCK_ID_INDEX,
  DATA_BASE_VERSION,
} from '../../models/indexedDb.models';

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  hasIndexedDb = window.indexedDB;

  createDataBase() {
    if (!this.hasIndexedDb) return;

    const request = indexedDB.open(CARDS_DATA_BASE_NAME, DATA_BASE_VERSION);

    request.onerror = (event) => {
      console.error('Ocorreu um erro ao abrir a base de dados', event);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore(CARDS_STORE_NAME, { keyPath: 'id' });
      store.createIndex(CARD_BLOCK_ID_INDEX, ['blockId']);
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(CARDS_STORE_NAME, 'readwrite');

      const store = transaction.objectStore(CARDS_STORE_NAME);

      store.put({ id: 0, name: 'Card de Teste 01', blockId: 0 });
      store.put({ id: 1, name: 'Card de Teste 11', blockId: 0 });
      store.put({ id: 2, name: 'Card de Teste 21', blockId: 0 });
      store.put({ id: 3, name: 'Card de Teste 31', blockId: 0 });
      store.put({ id: 4, name: 'Card de Teste 41', blockId: 0 });

      const idQuery = store.getAll();

      idQuery.onsuccess = () => {
        console.log(idQuery.result);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  }

  addNewElement() {
    const request = indexedDB.open(CARDS_DATA_BASE_NAME, DATA_BASE_VERSION);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(CARDS_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(CARDS_STORE_NAME);
      store.put({ id: 5, name: 'Card de Teste 51', blockId: 0 });
      store.put({ id: 3, name: 'Card de Teste Loucoooo', blockId: 0 });

      transaction.oncomplete = () => {
        db.close();
      };
    };
  }
}
