import { Injectable } from '@angular/core';
import { IBlock } from '@my-monorepo/core/features/trello-tools';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAddNewResponse, IDBService } from '../../models/base-db-models';
import {
  CARD_BLOCKS_DB_NAME,
  CARD_BLOCKS_STORE_NAME,
  CARD_BLOCKS_VERSION,
  INewBlock,
} from '../../models/card-block-db-models';
import { CardDbService } from '../card-db/card-db.service';

@Injectable({ providedIn: 'root' })
export class CardBlockDbService implements IDBService<IBlock> {
  hasIndexedDB = !!window.indexedDB;
  allElements$ = new BehaviorSubject<IBlock[]>([]);

  constructor(private readonly cardDbService: CardDbService) {}

  createDataBase() {
    if (!this.hasIndexedDB) return;

    const request = this.openRequest();

    request.onerror = this.onCreateError();
    request.onsuccess = this.onCreateSuccess();
    request.onupgradeneeded = this.onUpgradeNeeded(request);
  }

  addNewElement(element: INewBlock) {
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

  editElement(element: IBlock) {
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

  getAllElements$() {
    const request = this.openRequest();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const allQuery = store.getAll();

      allQuery.onsuccess = () => {
        const allBlocks = allQuery.result.map((block) => {
          return {
            ...block,
            cards$: this.cardDbService.getByBlockId(block.id),
            addNewEvent$: new BehaviorSubject<boolean>(false),
          };
        });

        this.allElements$.next(allBlocks);
      };

      allQuery.onerror = () => {
        console.error('Ocorreu um erro ao buscar os elementos');
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    return this.allElements$;
  }

  getElementById(id: number) {
    const request = this.openRequest();
    const element$ = new BehaviorSubject<IBlock | null | undefined>(null);

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const allQuery = store.get(id);

      allQuery.onsuccess = () => {
        const element = {
          ...allQuery.result,
          cards$: this.cardDbService.getByBlockId(allQuery.result.id),
          addNewEvent$: new BehaviorSubject<boolean>(false),
        };
        element$.next(element);
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

      store.add({ id: 0, name: 'Primeiro Block' });
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
