import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITableColumn } from '../../models/table';

@Component({
  selector: 'dynamic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {

  @Input({ required: true }) columns!: ITableColumn[]
  @Input({ required: true }) data!: T[]

  dataSource!: MatTableDataSource<T>
  displayedColumns!: string[]

  constructor() { }

  ngOnInit() {
    this.createDataSource()
  }

  createDataSource() {
    this.dataSource = new MatTableDataSource(this.data)

    this.displayedColumns = this.columns.map(item => item.selector)
  }
}
