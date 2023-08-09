import { Component, OnInit } from '@angular/core';
import { CoreUiDynamicTableModule } from '@my-monorepo/core/ui/dynamic-table'
import { COLUMNS, DATA } from '../../helpers/table-mocks';
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
