import { Injectable } from '@angular/core';
import { Icard } from '@my-monorepo/core/features/trello-tools';
import { IDBService } from '../../models/base-db-models';
import {
  CARDS_DB_NAME,
  CARDS_STORE_NAME,
  CARD_BLOCKS_VERSION,
  CARD_BLOCK_ID_INDEX,
  CARD_BLOCK_ID_KEY,
} from '../../models/card-db-models';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardDbService implements Omit<IDBService<Icard>, 'AllElements$'> {
  hasIndexedDB = !!window.indexedDB;

  createDataBase() {
    if (!this.hasIndexedDB) return;

    const request = this.openRequest();

    request.onerror = this.onCreateError();
    request.onsuccess = this.onCreateSuccess();
    request.onupgradeneeded = this.onUpgradeNeeded(request);
  }

  addNewElement(element: Icard) {
    const request = this.openRequest();
    const eventResponse$ = new Subject<string>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const addQuery = store.add(element);

      addQuery.onsuccess = () => {
        eventResponse$.next('Elemento adicionado com sucesso!');
      };

      addQuery.onerror = () => {
        eventResponse$.next('Ocorreu um erro ao adicionar o elemento');
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    return eventResponse$.asObservable();
  }

  deleteElement(id: number) {
    const eventResponse$ = new Subject<string>();
    const request = this.openRequest();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const getElement = store.get(id);

      getElement.onsuccess = () => {
        if (!getElement.result)
          return eventResponse$.next('Elemento não encontrado');

        const deleteQuery = store.delete(id);

        deleteQuery.onsuccess = () => {
          eventResponse$.next('Elemento deletado com sucesso!');
        };

        deleteQuery.onerror = () => {
          eventResponse$.next('Ocorreu um erro ao deletar o elemento');
        };
      };

      getElement.onerror = () => {
        eventResponse$.next('Ocorreu um erro ao buscar o elemento!');
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    return eventResponse$.asObservable();
  }

  getElementById(id: number) {
    const request = this.openRequest();
    const element$ = new Subject<Icard | null | undefined>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const allQuery = store.get(id);

      allQuery.onsuccess = () => {
        element$.next(allQuery.result);
      };

      allQuery.onerror = () => {
        console.error('Ocorreu um erro ao buscar o elemento');
        element$.next(null);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    return element$.asObservable();
  }

  onUpgradeNeeded(db: IDBOpenDBRequest) {
    return () => {
      const store = db.result.createObjectStore(CARDS_STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex(CARD_BLOCK_ID_INDEX, CARD_BLOCK_ID_KEY);

      store.add({ id: 0, name: 'Primeiro Card', blockId: 0 });
    };
  }

  getByBlockId(id: number) {
    const request = this.openRequest();
    const cards$ = new Subject<Icard[]>();
    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);
      const blockIdIndex = store.index(CARD_BLOCK_ID_INDEX);

      const blockQuery = blockIdIndex.getAll(id);

      blockQuery.onsuccess = () => {
        cards$.next(blockQuery.result);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
    return cards$.asObservable();
  }

  conectionValues(db: IDBDatabase) {
    const transaction = db.transaction(CARDS_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(CARDS_STORE_NAME);
    return { transaction, store };
  }

  openRequest = () => indexedDB.open(CARDS_DB_NAME, CARD_BLOCKS_VERSION);

  onCreateSuccess() {
    return () =>
      console.log(
        `Conexão com a base de dados '${CARDS_DB_NAME}' aberta com sucesso!`,
      );
  }

  onCreateError() {
    return () =>
      console.error(`Conexão com a base de dados '${CARDS_DB_NAME}' falhou!`);
  }
}
