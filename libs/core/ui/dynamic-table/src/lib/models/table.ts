import { Type } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

export interface ITableColumn<T> {
  label: string;
  selector: string;
  hasCustomField?: boolean;
  hasControls?: boolean;
  customEvent$?: Subject<ICustomEvent<T>>;
  component?: Type<DefaultInput<T>>;
  controlsOptions?: IColumnFormOptions<T>;
}

export interface ICustomEvent<T, U = unknown> {
  id: number;
  element: T;
  selector: keyof T;
  value: U;
}

export interface ITableConfig<T> {
  columns: ITableColumn<T>[];
  hasExpansion: boolean;
  hasPaginator: boolean;
  paginatorOptions?: IPaginatorOptions;
  hasDefaultPaginator?: boolean;
  defaultPaginatorOptions?: IDefaultPaginatorOptions;
  customPagination?: () => void;
}

export interface IPaginatorOptions {
  pageSize: number;
  pageSizeOptions: number[];
}

export interface IColumnFormOptions<T> {
  controls: IControls[];
  getValueChanges: (
    valueChanges$: Observable<T>,
    id: number,
    element: T,
    selector: keyof T
  ) => void;
}
export interface IDefaultPaginatorOptions {
  pageSize: number;
  totalSize: number;
  currentPage: number;
  previousLabel: string;
  nextLabel: string;
}
export interface DefaultInput<T> {
  tableElement: T;
  selector: keyof T;
  formControl: FormControl;
  columnOption: ITableColumn<T>;
}

export interface IBaseTableFather<T> {
  getValueChanges: (
    valueChanges$: Observable<T>,
    id: number,
    element: T,
    selector: keyof T
  ) => void;
  customPagination?: () => void;
}

export type IControls = AbstractControl | FormControl;

export interface IBasicTableTest {
  id: number;
  name: string;
  age: number;
  gmail: string;
}
