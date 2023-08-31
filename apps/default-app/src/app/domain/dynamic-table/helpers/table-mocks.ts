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
    controlsOptions: {
      controls: []
    }
  },
  {
    label: 'E-mail',
    selector: 'gmail',
  },
];

export const DATA = Array.from({ length: 10 }, (_, index) => {
  return {
    id: index,
    name: 'Pedro ' + index,
    age: index + 10,
    gmail: 'pedrofofao2014@gmial.com',
  };
});

export const TABLE_CONFIG: ITableConfig<unknown> = {
  hasExpansion: true,
  hasPaginator: true,
  paginatorOptions: {
    pageSize: 10,
    pageSizeOptions: [2, 10, 50, 100],
  },
  hasDefaultPaginator: false,
  defaultPaginatorOptions: {
    totalSize: DATA.length,
    currentPage: 1,
    pageSize: 2,
    previousLabel: 'Anterior',
    nextLabel: 'Proximo',
  },
  columns: COLUMNS,
};
