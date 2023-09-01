import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CoreFeaturesDynamicFormsModule,
  IInputBuilder,
} from '@my-monorepo/core/features/dynamic-forms';
import { CoreUiDynamicTableModule, IBaseTableFather, IBasicTableTest } from '@my-monorepo/core/ui/dynamic-table';
import { BehaviorSubject, Observable, pipe, startWith, tap } from 'rxjs';
import { CREATE_TABLE_CONFIG, DATA } from '../../helpers/table-mocks';
import { CoreFeaturesFormErrorModule } from "@my-monorepo/core/features/form-error"
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  standalone: true,
  imports: [
    CoreUiDynamicTableModule,
    CommonModule,
    CoreFeaturesDynamicFormsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreFeaturesFormErrorModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit, IBaseTableFather<IBasicTableTest> {
  tableConfig = CREATE_TABLE_CONFIG(this);
  data$ = new BehaviorSubject<IBasicTableTest[]>(DATA);
  DATA = DATA;
  form = new FormGroup({
    teste: new FormControl('aaa', Validators.required),
  });

  formsConfig: IInputBuilder<unknown>[] = [
    {
      label: 'Teste',
      placeholder: 'Teste',
      formName: 'teste',
      type: 'text',
      appearance: 'outline',
      isBasicInput: true,
      inputName: 'basicInput',
    },
  ];

  constructor(private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.tableConfig.customPagination)
      this.customPagination()
  }

  getValueChanges(valueChanges$: Observable<IBasicTableTest>, id: number, element: IBasicTableTest, selector: keyof IBasicTableTest) {
    valueChanges$.pipe(startWith(element[selector])).subscribe((value) => {
      console.log(`${id}- ${selector.toUpperCase()} Mudou para ${value} elemento`, element, this.findControl(selector, id));
    })
  }

  findControl(selector: keyof IBasicTableTest, id: number) {
    const column = this.tableConfig.columns.find(column => column.selector == selector)
    if (!column) return null
    return column.controlsOptions?.controls[id]
  }

  customPagination() {
    if (this.tableConfig.defaultPaginatorOptions) {
      const start = this.tableConfig.defaultPaginatorOptions.pageSize * (this.tableConfig.defaultPaginatorOptions.currentPage - 1)
      const end = this.tableConfig.defaultPaginatorOptions.pageSize * this.tableConfig.defaultPaginatorOptions.currentPage
      const newData = this.DATA.slice(start, end)
      this.data$.next(newData)
      this.cdr.detectChanges();
    }
  }

  cdrTap() {
    return pipe(
      tap(() => {
        this.cdr.detectChanges()
      })
    )
  }
}
