import { ITableColumn } from "@my-monorepo/core/ui/dynamic-table"
import { BasicInputComponent } from "../../../core/components/basic-input/basic-input.component"

export const COLUMNS: ITableColumn<unknown>[] = [
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


export const DATA = [
  {
    name: 'Pedro',
    age: 12,
    gmail: 'pedrofofao2014@gmial.com'
  },
  {
    name: 'Pedro',
    age: 12,
    gmail: 'pedrofofao2014@gmial.com'
  },
  {
    name: 'Pedro',
    age: 12,
    gmail: 'pedrofofao2014@gmial.com'
  },
  {
    name: 'Pedro',
    age: 12,
    gmail: 'pedrofofao2014@gmial.com'
  }
]
