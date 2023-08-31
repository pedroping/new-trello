import { IBaseTableFather, IBasicTableTest, ITableConfig } from '@my-monorepo/core/ui/dynamic-table';
import { Observable } from 'rxjs';
import { BasicInputComponent } from '../../../core/components/basic-input/basic-input.component';

export const DATA = Array.from({ length: 10 }, (_, index) => {
  return {
    id: index,
    name: 'Pedro ' + index,
    age: index + 10,
    gmail: 'pedrofofao2014@gmial.com',
  };
});

export const CREATE_TABLE_CONFIG = (component: IBaseTableFather<IBasicTableTest>) => {
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
    columns: [
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
          controls: [],
          getValueChanges: (valueChanges$: Observable<IBasicTableTest>, id: number, element: IBasicTableTest, selector: keyof IBasicTableTest) => {
            component.getValueChanges(valueChanges$, id, element, selector)
          }
        }
      },
      {
        label: 'E-mail',
        selector: 'gmail',
      },
    ],
  } as ITableConfig<IBasicTableTest>
}