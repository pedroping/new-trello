import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ExpandTableDirective,
  HasElementDirective,
  SelectedRowService,
} from '@my-monorepo/core/features/expand-table';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { TuiTagModule } from '@taiga-ui/kit';
import { NgxPaginationModule } from 'ngx-pagination';
import { ICON_STATE_ANIMATION } from '../../animations/iconState';
import { IN_OUT_PANE_ANIMATION } from '../../animations/inOutPane';
import { GenerateCustomFieldDirective } from '../../directives/generate-custom-field.directive';
import { ITableColumn, ITableConfig } from '../../models/table';
import { TableActions } from '../../service/table-actions.service';

@Component({
  selector: 'dynamic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  animations: [IN_OUT_PANE_ANIMATION, ICON_STATE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TuiTagModule,
    MatIconModule,
    CdkTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    HasElementDirective,
    ExpandTableDirective,
    GenerateCustomFieldDirective,
  ],
})
@CallSetValueChanges()
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  data = input.required<T[]>();
  config = input.required<ITableConfig<T>>();

  length = 0;
  columnsLength = 0;
  viewDataSource: T[] = [];
  displayedColumns: string[] = [];
  secondDisplayedHeaders: string[] = [];
  secondHeaders: ITableColumn<T>[] = [];
  dataSource!: MatTableDataSource<T>;
  availableTemplates: TemplateRef<unknown>[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ContentChildren('customTemplate') set templates(
    query: QueryList<TemplateRef<unknown>>,
  ) {
    this.availableTemplates = query.toArray();
  }

  constructor(
    readonly selectedRowService: SelectedRowService<T>,
    private readonly tableActions: TableActions,
  ) {}

  ngOnInit() {
    this.createDataSource();
  }

  ngAfterViewInit(): void {
    this.setPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.createDataSource();
    }
  }

  setValueChanges() {
    this.tableActions.resetTable$$.subscribe(this.resetTable.bind(this));
  }

  resetTable() {
    this.dataSource = new MatTableDataSource([] as T[]);
    this.createDataSource();
  }

  createDataSource() {
    this.setColumns();
    this.viewDataSource = this.data();
    this.length = this.data.length;
    this.dataSource = new MatTableDataSource(this.viewDataSource);
    this.setPaginator();

    if (this.config().hasDefaultPaginator && this.config().customPagination)
      this.config().customPagination?.();
  }

  setPaginator() {
    if (this.config().hasPaginator && this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  setColumns() {
    this.columnsLength = this.displayedColumns.length;
    this.secondHeaders = this.config()
      .columns.filter((item) => !!item.secondLabel)
      .map((item) => ({
        ...item,
        selector: `${item.selector}-second`,
      }));
    this.displayedColumns = this.config().columns.map((item) => item.selector);
    this.secondDisplayedHeaders = this.secondHeaders.map(
      (item) => item.selector,
    );

    if (!this.config().hasExpansion) return;

    this.displayedColumns.push('expandeIcon');
    this.secondDisplayedHeaders.push('expandeIcon');
  }

  handlePageChange(event: number | PageEvent) {
    this.scrollToTop();
    const config = this.config();
    if (typeof event == 'number' && config.defaultPaginatorOptions) {
      config.defaultPaginatorOptions.currentPage = event;
    }
    if (config.customPagination) return config.customPagination?.();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
