import {
  IBaseTableFather,
  IBasicTableTest,
  ITableConfig,
} from '@my-monorepo/core/ui/dynamic-table';
import { Observable } from 'rxjs';
import { BasicInputComponent } from '../../../core/components/basic-input/basic-input.component';

export const DATA = Array.from({ length: 100 }, (_, index) => {
  return {
    id: index,
    name: 'Pedro ' + index,
    age: index + 10,
    gmail: 'pedrofofao2014@gmail.com',
    gmail2: 'pedrofofao2014@gmail.com',
    gmail3: 'pedrofofao2014@gmail.com',
  };
}) as IBasicTableTest[];

export function createValueChangesFn<T>(component: IBaseTableFather<T>) {
  const valueChangesFn = (
    valueChanges$: Observable<T>,
    id: number,
    element: T,
    selector: keyof T,
  ) => {
    component.getValueChanges(valueChanges$, id, element, selector);
  };
  return valueChangesFn;
}

export function CREATE_TABLE_CONFIG<T>(component: IBaseTableFather<T>) {
  return {
    hasExpansion: true,
    hasPaginator: true,
    paginatorOptions: {
      pageSize: 5,
      pageSizeOptions: [2, 5, 10, 50, 100],
    },
    hasDefaultPaginator: false,
    defaultPaginatorOptions: {
      totalSize: DATA.length,
      currentPage: 1,
      pageSize: 2,
      previousLabel: 'Anterior',
      nextLabel: 'Proximo',
    },
    customPagination: () => {
      if (component?.customPagination) component.customPagination();
    },
    columns: [
      {
        label: 'Nome',
        selector: 'name',
        secondLabel: 'Teste',
      },
      {
        label: 'Idade',
        selector: 'age',
        secondLabel: 'Teste',
        hasCustomField: true,
        component: BasicInputComponent,
        controlsOptions: {
          controls: [],
          getValueChanges: createValueChangesFn(component),
        },
      },
      {
        label: 'E-mail',
        selector: 'gmail',
        secondLabel: 'Teste',
        secondLabelSpan: 3,
        hasCustomTemplate: true,
        templateId: 0,
      },
      {
        label: 'E-mail',
        selector: 'gmail2',
      },
      {
        label: 'E-mail',
        selector: 'gmail3',
      },
    ],
  } as ITableConfig<T>;
}
