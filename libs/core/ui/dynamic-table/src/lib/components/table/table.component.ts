import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITableConfig } from '../../models/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'dynamic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;

  @Input({ required: true }) config!: ITableConfig<T>
  @Input({ required: true }) data!: T[]

  dataSource!: MatTableDataSource<T>
  displayedColumns!: string[]
  length = 0

  constructor() { }

  ngOnInit() {
    this.createDataSource()
  }

  ngAfterViewInit(): void {
    if (this.config.hasPaginator && this.paginator) this.dataSource.paginator = this.paginator
  }

  createDataSource() {
    this.dataSource = new MatTableDataSource(this.data)
    this.length = this.data.length
    this.displayedColumns = this.config.columns.map(item => item.selector)
  }
}
