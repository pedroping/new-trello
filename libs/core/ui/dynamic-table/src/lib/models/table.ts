import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ITableColumn<T> {
  label: string;
  selector: string;
  hasCustomField?: boolean;
  component?: Type<DefaultInput<T>>;
}

export interface ITableConfig<T> {
  columns: ITableColumn<T>[];
  hasExpansion: boolean;
  hasPaginator: boolean;
  paginatorOptions?: IPaginatorOptions;
  hasDefaultPaginator?: boolean;
  defaultPaginatorOptions?: IDefaultPaginatorOptions;
  hasExpand: boolean;
}
export interface IPaginatorOptions {
  pageSize: number;
  pageSizeOptions: number[];
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
}
