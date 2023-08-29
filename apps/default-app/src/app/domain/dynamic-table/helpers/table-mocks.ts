import { ITableColumn, ITableConfig } from '@my-monorepo/core/ui/dynamic-table';
import { BasicInputComponent } from '../../../core/components/basic-input/basic-input.component';

const COLUMNS: ITableColumn<unknown>[] = [
  {
    label: 'Nome',
    selector: 'name',
  },
  {
    label: 'Idade',
    selector: 'age',
    hasCustomField: true,
    component: BasicInputComponent,
  },
  {
    label: 'E-mail',
    selector: 'gmail',
  },
];

export const DATA = Array.from({ length: 10 }, (_, index) => {
  return {
    name: 'Pedro ' + index,
    age: index + 10,
    gmail: 'pedrofofao2014@gmial.com',
  };
});

export const TABLE_CONFIG: ITableConfig<unknown> = {
  hasExpansion: false,
  hasPaginator: false,
  paginatorOptions: {
    pageSize: 2,
    pageSizeOptions: [2, 10, 50, 100],
  },
  hasDefaultPaginator: true,
  defaultPaginatorOptions: {
    totalSize: DATA.length,
    currentPage: 1,
    pageSize: 2,
    previousLabel: 'Anterior',
    nextLabel: 'Proximo',
  },
  columns: COLUMNS,
  hasExpand: true,
};
