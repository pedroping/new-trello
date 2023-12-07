import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { ITableConfig } from './table';

@Injectable()
export abstract class TableFatherPagination<T> {
  data$!: Observable<T[]>;
  tableConfig!: ITableConfig<T>;

  changeDataEvent$ = new Subject<void>();
  initialData$ = new BehaviorSubject<T[]>([]);

  startPagination() {
    this.setValueChanges();
  }

  setValueChanges() {
    this.data$.pipe(take(1)).subscribe((data) => this.initialData$.next(data));
    this.changeData();
  }

  changeData() {
    this.data$ = this.data$.pipe(
      switchMap((data) => {
        return this.changeDataEvent$.pipe(
          startWith(true),
          map(() => this.newDataCallback(data))
        );
      })
    );
  }

  setChangeEvent() {
    this.changeDataEvent$.next();
  }

  newDataCallback = (data: T[]) => {
    const paginatorOptions = this.tableConfig.defaultPaginatorOptions;
    if (!paginatorOptions || !this.tableConfig.hasDefaultPaginator) return data;
    const initialData = this.initialData$.value;
    const start =
      paginatorOptions.pageSize * (paginatorOptions.currentPage - 1);
    const end = paginatorOptions.pageSize * paginatorOptions.currentPage;
    return initialData.slice(start, end);
  };
}
