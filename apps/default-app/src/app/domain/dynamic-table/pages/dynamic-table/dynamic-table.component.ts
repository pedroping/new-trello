import { Component, OnInit } from '@angular/core';
import { CoreUiDynamicTableModule } from '@my-monorepo/core/ui/dynamic-table'
import { ITableColumn } from '@my-monorepo/core/ui/dynamic-table'

export const COLUMNS: ITableColumn[] = [
  {
    label: 'Nome',
    selector: 'name'
  },
  {
    label: 'Idade',
    selector: 'age'
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



@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  standalone: true,
  imports: [CoreUiDynamicTableModule]
})
export class DynamicTableComponent implements OnInit {

  colums = COLUMNS
  data = DATA

  constructor() { }

  ngOnInit() {
  }

}
