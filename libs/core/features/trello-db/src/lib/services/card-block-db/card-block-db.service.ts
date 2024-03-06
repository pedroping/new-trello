import { Injectable } from '@angular/core';
import { IBlock } from '@my-monorepo/core/features/trello-tools';
import { Subject } from 'rxjs';
import { IDBService } from '../../models/base-db-models';
import {
  CARD_BLOCKS_DB_NAME,
  CARD_BLOCKS_STORE_NAME,
  CARD_BLOCKS_VERSION,
} from '../../models/card-block-db-models';

@Injectable({ providedIn: 'root' })
export class CardBlockDbService implements IDBService<IBlock> {
  hasIndexedDB = !!window.indexedDB;

  createDataBase() {
    if (!this.hasIndexedDB) return;

    const request = this.openRequest();

    request.onerror = this.onCreateError();
    request.onsuccess = this.onCreateSuccess();
    request.onupgradeneeded = this.onUpgradeNeeded(request);
  }

  addNewElement(element: Omit<IBlock, 'addNewEvent$'>) {
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

  get AllElements$() {
    const request = this.openRequest();
    const allElements$ = new Subject<IBlock[]>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const allQuery = store.getAll();

      allQuery.onsuccess = () => {
        allElements$.next(allQuery.result);
      };

      allQuery.onerror = () => {
        console.error('Ocorreu um erro ao buscar os elementos');
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    return allElements$.asObservable();
  }

  getElementById(id: number) {
    const request = this.openRequest();
    const element$ = new Subject<IBlock | null | undefined>();

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

  openRequest = () => indexedDB.open(CARD_BLOCKS_DB_NAME, CARD_BLOCKS_VERSION);

  conectionValues(db: IDBDatabase) {
    const transaction = db.transaction(CARD_BLOCKS_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(CARD_BLOCKS_STORE_NAME);
    return { transaction, store };
  }

  onUpgradeNeeded(db: IDBOpenDBRequest) {
    return () => {
      const store = db.result.createObjectStore(CARD_BLOCKS_STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });

      store.add({ id: 0, name: 'Primeiro Block', cards: [] });
    };
  }

  onCreateSuccess() {
    return () =>
      console.log(
        `Conexão com a base de dados '${CARD_BLOCKS_DB_NAME}' aberta com sucesso!`,
      );
  }

  onCreateError() {
    return () =>
      console.error(
        `Conexão com a base de dados '${CARD_BLOCKS_DB_NAME}' falhou!`,
      );
  }
}
