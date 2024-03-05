import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsComponent } from '@my-monorepo/core/features/dynamic-forms';
import { FormErrorDirective } from '@my-monorepo/core/features/form-error';
import {
  IBaseTableFather,
  IBasicTableTest,
  ITableConfig,
  TableActions,
  TableComponent,
  TableFatherPagination,
} from '@my-monorepo/core/ui/dynamic-table';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { DefaultTableService } from '../../../../core/services/default-table.service';
import { DATA } from '../../helpers/table-mocks';
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableComponent,
    FormErrorDirective,
    ReactiveFormsModule,
    DynamicFormsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent
  extends TableFatherPagination<IBasicTableTest>
  implements OnInit, IBaseTableFather<IBasicTableTest>
{
  override tableConfig!: ITableConfig<IBasicTableTest>;
  override data$!: BehaviorSubject<IBasicTableTest[]>;
  defaultTableService = inject(DefaultTableService<IBasicTableTest>);
  tableActions = inject(TableActions);

  ngOnInit() {
    this.createTableValues();
    this.startPagination();
    if (
      this.tableConfig.hasDefaultPaginator &&
      this.tableConfig.customPagination
    )
      this.customPagination();
  }

  createTableValues() {
    this.tableConfig = this.defaultTableService.createTableConfig(this);
    this.data$ = this.defaultTableService.createData(DATA);
  }

  getValueChanges(
    valueChanges$: Observable<IBasicTableTest>,
    id: number,
    element: IBasicTableTest,
    selector: keyof IBasicTableTest,
  ) {
    valueChanges$.pipe(startWith(element[selector])).subscribe((value) => {
      console.log(
        `${id}- ${selector.toUpperCase()} Mudou para ${value} elemento`,
        element,
        this.findControl(selector, id),
      );
    });
  }

  findControl(selector: keyof IBasicTableTest, id: number) {
    const column = this.tableConfig.columns.find(
      (column) => column.selector == selector,
    );
    if (!column) return null;
    return column.controlsOptions?.controls[id];
  }

  customPagination() {
    this.setChangeEvent();
  }

  a() {
    this.data$.subscribe((value) => {
      value[3] = { ...value[3], age: 1000, gmail: 'Teste' };
      this.tableActions.resetTable();
    });
  }
}
