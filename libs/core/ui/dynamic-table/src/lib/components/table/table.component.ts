import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectedRowService } from '@my-monorepo/core/features/expand-table';
import { ITableConfig } from '../../models/table';

@Component({
  selector: 'dynamic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(
          '150ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate(
          '100ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;

  @Input({ required: true }) config!: ITableConfig<T>;
  @Input({ required: true }) data!: T[];

  dataSource!: MatTableDataSource<T>;
  viewDataSource!: T[];
  displayedColumns!: string[];
  columnsLength = 0;
  length = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    readonly selectedRowService: SelectedRowService<T>
  ) { }

  ngOnInit() {
    this.createDataSource();
  }

  ngAfterViewInit(): void {
    if (this.config.hasPaginator && this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.createDataSource();
    }
  }


  createDataSource() {
    this.viewDataSource = this.data;
    this.dataSource = new MatTableDataSource(this.viewDataSource);
    if (this.config.hasDefaultPaginator && !this.config?.customPagination)
      this.paginate();
    this.length = this.data.length;
    this.displayedColumns = this.config.columns.map((item) => item.selector);
    this.columnsLength = this.displayedColumns.length;
    if (this.config.hasExpansion) this.displayedColumns = [...this.displayedColumns, 'expandeIcon']
  }

  handlePageChange(event: number | PageEvent) {
    if (typeof event == 'number' && this.config.defaultPaginatorOptions) {
      this.config.defaultPaginatorOptions.currentPage = event;
    }
    if (this.config.customPagination)
      return this.config.customPagination()
    this.paginate();
  }

  paginate() {
    const paginatorOptions = this.config.defaultPaginatorOptions;
    if (paginatorOptions) {
      const start =
        paginatorOptions.pageSize * (paginatorOptions.currentPage - 1);
      const end = paginatorOptions.pageSize * paginatorOptions.currentPage;
      this.viewDataSource = this.data.slice(start, end);
      this.dataSource.data = this.viewDataSource;
      this.cdr.detectChanges();
    }
  }
}
