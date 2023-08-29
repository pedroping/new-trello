import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITableConfig } from '../../models/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  viewDataSource!: T[]
  displayedColumns!: string[]
  columnsLength = 0
  length = 0

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.createDataSource()
  }

  ngAfterViewInit(): void {
    if (this.config.hasPaginator && this.paginator) this.dataSource.paginator = this.paginator
  }

  createDataSource() {
    this.viewDataSource = this.data
    this.dataSource = new MatTableDataSource(this.viewDataSource)
    if (this.config.hasDefaultPaginator)
      this.paginate()
    this.length = this.data.length
    this.displayedColumns = this.config.columns.map(item => item.selector)
    this.columnsLength = this.displayedColumns.length
  }

  handlePageChange(event: number | PageEvent) {
    if (typeof event == 'number' && this.config.defaultPaginatorOptions) {
      this.config.defaultPaginatorOptions.currentPage = event
    }
    this.paginate()
  }

  paginate() {
    const paginatorOptions = this.config.defaultPaginatorOptions
    if (paginatorOptions) {
      const start = paginatorOptions.pageSize * (paginatorOptions.currentPage - 1)
      const end = paginatorOptions.pageSize * (paginatorOptions.currentPage)
      this.viewDataSource = this.data.slice(start, end)
      this.dataSource.data = this.viewDataSource
      this.cdr.detectChanges()
    }
  }
}
