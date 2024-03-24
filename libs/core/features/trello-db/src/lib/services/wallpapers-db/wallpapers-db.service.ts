import { Injectable } from '@angular/core';
import { ISrcImg } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAddNewResponse, IDBService } from '../../models/base-db-models';
import {
  WALLPAPERS_DB_NAME,
  WALLPAPERS_VERSION,
} from '../../models/wallpaper-db-models';

@Injectable({ providedIn: 'root' })
export class WallpapersDbService implements IDBService<ISrcImg> {
  hasIndexedDB = !!window.indexedDB;
  allElements$ = new BehaviorSubject<ISrcImg[]>([]);

  createDataBase() {
    if (!this.hasIndexedDB) return;

    const request = this.openRequest();

    request.onerror = this.onCreateError();
    request.onsuccess = this.onCreateSuccess();
    request.onupgradeneeded = this.onUpgradeNeeded(request);
  }

  openRequest = () => indexedDB.open(WALLPAPERS_DB_NAME, WALLPAPERS_VERSION);

  onUpgradeNeeded(db: IDBOpenDBRequest) {
    return () => {
      db.result.createObjectStore(WALLPAPERS_DB_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      this.setAllElement();
    };
  }

  onCreateSuccess() {
    return () => {
      console.log(
        `Conexão com a base de dados '${WALLPAPERS_DB_NAME}' aberta com sucesso!`,
      );
      this.setAllElement();
    };
  }

  onCreateError() {
    return () =>
      console.error(
        `Conexão com a base de dados '${WALLPAPERS_DB_NAME}' falhou!`,
      );
  }

  conectionValues(db: IDBDatabase) {
    const transaction = db.transaction(WALLPAPERS_DB_NAME, 'readwrite');
    const store = transaction.objectStore(WALLPAPERS_DB_NAME);
    return { transaction, store };
  }

  setAllElement() {
    const request = this.openRequest();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const allQuery = store.getAll();

      allQuery.onsuccess = () => {
        const allBlocks = allQuery.result;
        this.allElements$.next(allBlocks);
      };

      allQuery.onerror = () => {
        console.error('Ocorreu um erro ao buscar os elementos');
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  }

  addNewElement(element: Partial<ISrcImg>) {
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

  editElement(element: ISrcImg) {
    const request = this.openRequest();
    const eventResponse$ = new Subject<IAddNewResponse>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const elementToEdit = {
        id: element.id,
        src: element.src,
        selected: element.selected,
      };

      const editQuery = store.put(elementToEdit);

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
    return this.allElements$;
  }

  getElementById(id: number) {
    const request = this.openRequest();
    const element$ = new BehaviorSubject<ISrcImg | null | undefined>(null);

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

  clearDb() {
    const request = this.openRequest();
    const eventResponse$ = new Subject<string>();

    request.onsuccess = () => {
      const db = request.result;
      const { transaction, store } = this.conectionValues(db);

      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        eventResponse$.next(`${WALLPAPERS_DB_NAME} limpa com sucesso`);
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
}
