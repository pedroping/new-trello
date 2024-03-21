import { Injectable } from '@angular/core';
import { Icard } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAddNewResponse, IDBService } from '../../models/base-db-models';
import {
  CARDS_DB_NAME,
  CARDS_STORE_NAME,
  CARD_BLOCKS_VERSION,
  CARD_BLOCK_ID_INDEX,
  CARD_BLOCK_ID_KEY,
} from '../../models/card-db-models';

@Injectable({ providedIn: 'root' })
export class CardDbService
  implements Omit<IDBService<Icard>, 'getAllElements$' | 'setAllElement'>
{
  hasIndexedDB = !!window.indexedDB;

  createDataBase() {
    if (!this.hasIndexedDB) return;

    const request = this.openRequest();

    request.onerror = this.onCreateError();
    request.onsuccess = this.onCreateSuccess();
    request.onupgradeneeded = this.onUpgradeNeeded(request);
  }

  clearDb() {
    const request = this.openRequest();
    const eventResponse$ = new Subject<string>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        eventResponse$.next(`${CARDS_STORE_NAME} limpa com sucesso`);
      };

      clearRequest.onerror = () => {
        eventResponse$.next('Ocorreu um erro');
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    return eventResponse$.asObservable();
  }

  addNewElement(element: Icard) {
    const request = this.openRequest();
    const eventResponse$ = new Subject<IAddNewResponse>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const addQuery = store.add(element);

      addQuery.onsuccess = () => {
        eventResponse$.next({
          resp: 'Elemento adicionado com sucesso!',
          id: addQuery.result as number,
        });
      };

      addQuery.onerror = () => {
        eventResponse$.next({
          resp: 'Ocorreu um erro ao adicionar o elemento',
          id: -1,
        });
      };
      transaction.oncomplete = () => {
        db.close();
      };
    };

    return eventResponse$.asObservable();
  }

  editElement(element: Icard) {
    const request = this.openRequest();
    const eventResponse$ = new Subject<IAddNewResponse>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const editQuery = store.put(element);

      editQuery.onsuccess = () => {
        eventResponse$.next({
          resp: 'Elemento alterado com sucesso!',
          id: editQuery.result as number,
        });
      };

      editQuery.onerror = () => {
        eventResponse$.next({
          resp: 'Ocorreu um erro ao editar o elemento',
          id: -1,
        });
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

    return element$;
  }

  onUpgradeNeeded(db: IDBOpenDBRequest) {
    return () => {
      const store = db.result.createObjectStore(CARDS_STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex(CARD_BLOCK_ID_INDEX, CARD_BLOCK_ID_KEY);
    };
  }

  getByBlockId(id: number) {
    const request = this.openRequest();
    const cards$ = new BehaviorSubject<Icard[]>([]);
    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);
      const blockIdIndex = store.index(CARD_BLOCK_ID_INDEX);

      const blockQuery = blockIdIndex.getAll(id);

      blockQuery.onsuccess = () => {
        const result = blockQuery.result.sort(
          (a, b) => a?.cardIndex - b?.cardIndex,
        );
        cards$.next(result);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
    return cards$;
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
