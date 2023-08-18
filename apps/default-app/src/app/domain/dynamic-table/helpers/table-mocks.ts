import { ITableColumn, ITableConfig } from "@my-monorepo/core/ui/dynamic-table"
import { BasicInputComponent } from "../../../core/components/basic-input/basic-input.component"

const COLUMNS: ITableColumn<unknown>[] = [
  {
    label: 'Nome',
    selector: 'name'
  },
  {
    label: 'Idade',
    selector: 'age',
    hasCustomField: true,
    component: BasicInputComponent
  },
  {
    label: 'E-mail',
    selector: 'gmail'
  }
]

export const TABLE_CONFIG: ITableConfig<unknown> = {
  hasPaginator: true,
  hasExpansion: false,
  paginatorOptions: {
    pageSize: 5,
    pageSizeOptions: [2, 5, 10, 50, 100]
  },
  columns: COLUMNS
}



export const DATA = Array.from({ length: 10 }, (_, index) => {
  return {
    name: 'Pedro',
    age: index + 10,
    gmail: 'pedrofofao2014@gmial.com'
  };
})

