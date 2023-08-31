import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CoreFeaturesDynamicFormsModule,
  IInputBuilder,
} from '@my-monorepo/core/features/dynamic-forms';
import { CoreUiDynamicTableModule, IBaseTableFather, IBasicTableTest } from '@my-monorepo/core/ui/dynamic-table';
import { Observable, of, startWith, tap } from 'rxjs';
import { CREATE_TABLE_CONFIG, DATA } from '../../helpers/table-mocks';
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
  ],
})
export class DynamicTableComponent implements OnInit, IBaseTableFather<IBasicTableTest> {
  tableConfig = CREATE_TABLE_CONFIG(this);
  data$ = of(DATA).pipe(
    tap(() => {
      this.cdr.detectChanges();
    })
  );
  DATA = DATA;
  form = new FormGroup({
    teste: new FormControl('aaa'),
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

  ngOnInit() { }

  getValueChanges(valueChanges$: Observable<IBasicTableTest>, id: number, element: IBasicTableTest, selector: keyof IBasicTableTest) {
    valueChanges$.pipe(startWith(element[selector])).subscribe((value) => {
      console.log(`${id} Mudou para ${value} elemento`, element, selector, this.findControl(selector, id));
    })
  }

  findControl(selector: keyof IBasicTableTest, id: number) {
    const column = this.tableConfig.columns.find(column => column.selector == selector)
    if (!column) return null
    return column.controlsOptions?.controls[id]
  }
}
