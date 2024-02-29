import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DynamicFormsComponent,
  IInputBuilder,
} from '@my-monorepo/core/features/dynamic-forms';
import { FormErrorDirective } from '@my-monorepo/core/features/form-error';
import {
  IBaseTableFather,
  IBasicTableTest,
  ITableConfig,
  TableComponent,
  TableFatherPagination,
} from '@my-monorepo/core/ui/dynamic-table';
import { Observable, of, startWith } from 'rxjs';
import { CREATE_TABLE_CONFIG, DATA } from '../../helpers/table-mocks';
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
  override data$: Observable<IBasicTableTest[]> = of(DATA);

  form = new FormGroup({
    teste: new FormControl(null, Validators.required),
  });

  formsConfig: IInputBuilder<unknown>[] = [
    {
      label: 'Teste',
      placeholder: 'Teste',
      formName: 'teste',
      type: 'text',
      appearance: 'outline',
      isBasicInput: true,
      inputName: 'BasicInputComponent',
    },
  ];

  ngOnInit() {
    this.tableConfig = CREATE_TABLE_CONFIG(this);
    this.startPagination();
    if (
      this.tableConfig.hasDefaultPaginator &&
      this.tableConfig.customPagination
    )
      this.customPagination();
  }

  getValueChanges(
    valueChanges$: Observable<IBasicTableTest>,
    id: number,
    element: IBasicTableTest,
    selector: keyof IBasicTableTest
  ) {
    valueChanges$.pipe(startWith(element[selector])).subscribe((value) => {
      console.log(
        `${id}- ${selector.toUpperCase()} Mudou para ${value} elemento`,
        element,
        this.findControl(selector, id)
      );
    });
  }

  findControl(selector: keyof IBasicTableTest, id: number) {
    const column = this.tableConfig.columns.find(
      (column) => column.selector == selector
    );
    if (!column) return null;
    return column.controlsOptions?.controls[id];
  }

  customPagination() {
    this.setChangeEvent();
  }
}
